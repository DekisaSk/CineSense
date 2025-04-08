import asyncio
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, RunReportRequest
from core.config import settings

PROPERTY_ID = settings.GA4_PROPERTY_ID
client = BetaAnalyticsDataClient()


def _build_report_request(metric: str) -> RunReportRequest:
    """
    Create a RunReportRequest based on the provided metric string.
    """
    if metric == "totalViews":
        selected_metrics = [Metric(name="screenPageViews")]
    elif metric == "totalSmartSearches":
        selected_metrics = [Metric(name="eventCount")]
    elif metric == "uniqueViewers":
        selected_metrics = [Metric(name="totalUsers")]
    elif metric == "userVisits":
        selected_metrics = [Metric(name="sessions")]
    else:
        raise ValueError("Invalid metric parameter")

    request = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
        dimensions=[Dimension(name="date")],
        metrics=selected_metrics,
    )
    return request


def _parse_report_response(response) -> dict:
    """
    Process the GA4 API response into a dict with lists of labels and values.
    """
    labels = [row.dimension_values[0].value for row in response.rows]
    values = [float(row.metric_values[0].value) for row in response.rows]
    return {"labels": labels, "values": values}


def get_analytics_report_sync(metric: str) -> dict:
    """
    Synchronous function to query GA and return the report data.
    """
    request = _build_report_request(metric)
    response = client.run_report(request)
    return _parse_report_response(response)


async def get_analytics_report(metric: str) -> dict:

    return await asyncio.to_thread(get_analytics_report_sync, metric)
