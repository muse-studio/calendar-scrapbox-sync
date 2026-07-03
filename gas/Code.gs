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

/**
 * イベントタイトルに一致するProjectを検索する
 */
function findProject(title) {
    for (const project of PROJECTS) {
        const keywords = project.keywords ?? [];

        for (const keyword of keywords) {
            if (title.includes(keyword)) {
                return project;
            }
        }
    }

    return null;
}

/**
 * findProject の動作をLoggerで確認する
 */
function testFindProject() {
    const title = "ふくくるさんぽ（編曲演奏・リズムパフォーマンス）";
    const project = findProject(title);

    Logger.log("Title : " + title);
    Logger.log("Matched : " + (project ? project.title : "(none)"));
}

/**
 * ProjectオブジェクトからScrapbox URLを生成する
 */
function buildScrapboxUrl(project) {
    return "https://scrapbox.io/" + project.title + "/" + project.scrapbox.page;
}

/**
 * buildScrapboxUrl の動作をLoggerで確認する
 */
function testBuildScrapboxUrl() {
    const project = PROJECTS[0];

    Logger.log("Project : " + project.title);
    Logger.log("Generated URL : " + buildScrapboxUrl(project));
}
