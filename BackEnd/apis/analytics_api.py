from fastapi import APIRouter, HTTPException, Query
from services.analytics_service import get_analytics_report

router = APIRouter()

@router.get('/analytics')
async def analytics(metric: str = Query(..., description="The metric to fetch. Options: totalViews, totalSmartSearches, uniqueViewers, userVisits")):
    return await get_analytics_report(metric)