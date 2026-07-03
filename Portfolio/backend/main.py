from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

# Frontend ko connect hone ki permission dena (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Frontend se aane wale data ka structure
class PortfolioRequest(BaseModel):
    tickers: list[str]

@app.post("/optimize")
def optimize_portfolio(request: PortfolioRequest):
    # Asli hackathon mein yahan numpy/pandas ka formula aayega.
    # Abhi ke liye hum generated dummy points bhej rahe hain:
    
    random_portfolios = []
    for _ in range(20):
        random_portfolios.append({
            "x": round(random.uniform(10, 25), 2),  # Risk
            "y": round(random.uniform(5, 15), 2)    # Return
        })
        
    optimal_portfolio = [{"x": 12, "y": 14}] # Low Risk, High Return

    return {
        "randomPortfolios": random_portfolios,
        "optimalPortfolio": optimal_portfolio
    }