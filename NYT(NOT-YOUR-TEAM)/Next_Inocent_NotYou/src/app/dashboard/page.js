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
  <div className="min-h-screen bg-black flex ">
    {/* Sidebar */}
    <aside
      className={`bg-black flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64 p-4" : "w-0 p-0 overflow-hidden"
      }`}
    >
      <button
        onClick={() => router.push("/")}
        className="text-xl font-bold relative text-blue-600 mb-8 text-left whitespace-nowrap"
      >
        <span className="text-2xl font-bold text-violet-900 ">NEXT INOCENT  </span>
          <span className=" font-bold top-2 text-white left-32  text-xl absolute"> Not You</span>
      </button>

      <nav className="flex flex-col gap-2">
        <button
          onClick={() => setActiveTab("summarizer")}
          className={`text-left px-3 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "summarizer"
              ? "bg-violet-900 text-white"
              : "text-white hover:bg-violet-800"
          }`}
        >
          Summarizer
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`text-left px-3 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "history"
              ? "bg-violet-900 text-white"
              : "text-white hover:bg-violet-800"
          }`}
        >
          History ({summaries.length})
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`text-left px-3 py-2 rounded-lg font-medium whitespace-nowrap ${
            activeTab === "profile"
              ? "bg-violet-900 text-white"
              : "text-white hover:bg-violet-800"
          }`}
        >
          Profile
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto text-sm text-violet-900 hover:underline text-left whitespace-nowrap"
      >
        Logout
      </button>
      
    </aside>

    {/* Main content */}
    <main className="flex-1 bg-black p-8">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="mb-6 p-2 hover:text-white rounded-lg  text-violet-500"
      >
        {sidebarOpen ? "☰ Close Menu" : "☰ Open Menu"}
      </button>

      {activeTab === "summarizer" && (
        <div className="max-w-2xl space-y-6">
          <h1 className="text-2xl font-bold text-white">Paste T&C and Summarize</h1>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your Terms & Conditions here..."
            className="w-full text-white h-60 p-4 border border-violet-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            onClick={handleSummarize}
            disabled={loading || !text}
            className="w-full bg-violet-500  text-white py-3 rounded-lg font-medium hover:bg-violet-400 disabled:opacity-50"
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>

          {summarizeError && <p className="text-violet-500 font-bold text-sm">{summarizeError}</p>}

          {bullets.length > 0 && <BulletAccordion bullets={bullets} />}
        </div>
      )}

      {activeTab === "history" && (
        <div className="max-w-2xl space-y-3">
          <h1 className="text-2xl font-bold text-white mb-4">
            Your Summary History
          </h1>

          {summaries.length === 0 && (
            <p className="text-white text-sm">No summaries yet. Go create one!</p>
          )}

          {summaries.map((summary) => (
            <div
              key={summary._id}
              className="bg-violet-500 p-4 rounded-lg shadow-sm border "
            >
              <p className="text-xs text-white font-bold mb-2">
                {new Date(summary.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-200">
                {summary.originalText.slice(0, 150)}...
              </p>
              <p className="text-xs font-semibold text-blue-900  mt-2">
                {summary.bullets.length} bullet points generated
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "profile" && (
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-violet-500 mb-4">Profile</h1>
          <div className="bg-violet-500 p-5 rounded-lg shadow-sm">
            <p className="text-white">Name: {user.name}</p>
            <p className="text-white">Email: {user.email}</p>
          </div>
        </div>
      )}
    </main>
  </div>
);
}