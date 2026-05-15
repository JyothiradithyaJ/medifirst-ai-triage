def mark_report_pending(report):
    report.sync_status = "pending"
    return report


def mark_report_synced(report):
    report.sync_status = "synced"
    return report


def mark_report_failed(report):
    report.sync_status = "failed"
    return report


def is_pending(report):
    return report.sync_status == "pending"