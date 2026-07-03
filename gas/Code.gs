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

        const project = findProject(event.getTitle());

        if (project) {
            Logger.log("Matched : " + project.title);
            Logger.log("URL : " + buildScrapboxUrl(project));
        } else {
            Logger.log("Matched : (none)");
        }
    });
}

/**
 * イベントタイトルに一致するProjectを検索する
 */
function findProject(title) {
    return PROJECTS.find((project) => {
        const terms = [
            project.title,
            ...project.keywords,
            ...(project.aliases || []),
        ];

        return terms.some((term) => title.includes(term));
    });
}

/**
 * Scrapbox ProjectページのURLを生成する
 */
function buildScrapboxUrl(project) {
    return "https://scrapbox.io/" + project.scrapbox.project + "/" + project.scrapbox.page;
}
