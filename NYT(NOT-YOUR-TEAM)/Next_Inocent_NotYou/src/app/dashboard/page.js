"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BulletAccordion from "@/components/BulletAccordion";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("summarizer");

  const [user, setUser] = useState(null);
  const [summaries, setSummaries] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [error, setError] = useState("");

  const [text, setText] = useState("");
  const [bullets, setBullets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summarizeError, setSummarizeError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
        } else {
          setUser(data.user);
          setSummaries(data.summaries);
        }
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setDashboardLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleSummarize = async () => {
    setLoading(true);
    setSummarizeError("");
    setBullets([]);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.error) {
        setSummarizeError(data.error);
      } else {
        setBullets(data.bullets);
        setSummaries((prev) => [
          { _id: Date.now(), originalText: text, bullets: data.bullets, createdAt: new Date() },
          ...prev,
        ]);
      }
    } catch (e) {
      setSummarizeError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (dashboardLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

 return (
  <div className="min-h-screen flex bg-gray-50">
    {/* Sidebar */}
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64 p-4" : "w-0 p-0 overflow-hidden"
      }`}
    >
      <button
        onClick={() => router.push("/")}
        className="text-xl font-bold text-blue-600 mb-8 text-left whitespace-nowrap"
      >
        T&C Summarizer
      </button>

      <nav className="flex flex-col gap-2">
        <button
          onClick={() => setActiveTab("summarizer")}
          className={`text-left px-3 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "summarizer"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Summarizer
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`text-left px-3 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "history"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          History ({summaries.length})
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`text-left px-3 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "profile"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Profile
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto text-sm text-red-600 hover:underline text-left whitespace-nowrap"
      >
        Logout
      </button>
    </aside>

    {/* Main content */}
    <main className="flex-1 p-8">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="mb-6 p-2 rounded-lg hover:bg-gray-100 text-gray-600"
      >
        {sidebarOpen ? "☰ Close Menu" : "☰ Open Menu"}
      </button>

      {activeTab === "summarizer" && (
        <div className="max-w-2xl space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Summarize T&C</h1>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your Terms & Conditions here..."
            className="w-full h-60 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleSummarize}
            disabled={loading || !text}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>

          {summarizeError && <p className="text-red-500 text-sm">{summarizeError}</p>}

          {bullets.length > 0 && <BulletAccordion bullets={bullets} />}
        </div>
      )}

      {activeTab === "history" && (
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Your Summary History
          </h1>

          {summaries.length === 0 && (
            <p className="text-gray-500 text-sm">No summaries yet. Go create one!</p>
          )}

          {summaries.map((summary) => (
            <div
              key={summary._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <p className="text-xs text-gray-400 mb-2">
                {new Date(summary.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                {summary.originalText.slice(0, 150)}...
              </p>
              <p className="text-xs text-blue-600 mt-2">
                {summary.bullets.length} bullet points generated
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "profile" && (
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <p className="text-gray-600">Name: {user.name}</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        </div>
      )}
    </main>
  </div>
);
}