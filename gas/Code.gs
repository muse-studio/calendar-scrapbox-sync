/**
 * Version 0.1
 * Google Calendar から今後60日間の予定を取得してログに表示する
 */
function listUpcomingEvents() {
    const calendar = CalendarApp.getDefaultCalendar();

    const now = new Date();

    const end = new Date(now);
    end.setDate(end.getDate() + 60);

    const events = calendar.getEvents(now, end);

    Logger.log("=== Calendar Events ===");
    Logger.log("Count: " + events.length);

    events.forEach((event) => {
        Logger.log("----------------------------------------");
        Logger.log("Title : " + event.getTitle());
        Logger.log("Start : " + event.getStartTime());
        Logger.log("End   : " + event.getEndTime());
    });
}
