/**
 * Version 0.1
 * Google Calendar から今後60日間の予定を取得してログに表示する
 */
const DRY_RUN = CONFIG.dryRun;

function listUpcomingEvents() {
    const calendar = CalendarApp.getDefaultCalendar();

    const now = new Date();

    const end = new Date(now);
    end.setDate(end.getDate() + CONFIG.lookAheadDays);

    const events = calendar.getEvents(now, end);

    Logger.log("=== DRY RUN ===");
    Logger.log("Count: " + events.length);

    let updateCount = 0;
    events.forEach((event) => {
        const title = event.getTitle();
        const description = event.getDescription() || "";
        const project = findProject(title);
        const url = project ? buildScrapboxUrl(project) : null;
        const newDescription = url
            ? buildNewDescription(description, url)
            : description;
        const shouldUpdate = newDescription !== description;

        Logger.log("----------------------------------------");
        Logger.log("Title: " + title);
        Logger.log("");
        Logger.log("Current Description:");
        Logger.log(description || "(empty)");
        Logger.log("");

        if (project) {
            Logger.log("Matched:");
            Logger.log(project.title);
            Logger.log("");
            Logger.log("URL:");
            Logger.log(url);
        } else {
            Logger.log("Matched:");
            Logger.log("(none)");
        }

        Logger.log("");
        Logger.log("New Description:");
        Logger.log(newDescription || "(empty)");
        Logger.log("");
        Logger.log("Action:");

        if (shouldUpdate) {
            updateCount++;
            if (DRY_RUN) {
                Logger.log("Would Update");
            } else {
                event.setDescription(newDescription);
                Logger.log("Updated");
            }
        } else {
            Logger.log("No Change");
        }
    });
    Logger.log("----------------------------------------");
    Logger.log("Summary");
    Logger.log("Events : " + events.length);
    Logger.log("Updates: " + updateCount);
    Logger.log("DRY_RUN: " + DRY_RUN);
    Logger.log("Look ahead days: " + CONFIG.lookAheadDays);
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
    return (
        "https://scrapbox.io/" +
        project.scrapbox.project +
        "/" +
        project.scrapbox.page
    );
}

/**
 * Dry Run用に更新後のDescriptionを生成する
 */
function buildNewDescription(description, url) {
    if (!description) {
        return "■Project\n" + url;
    }

    if (description.includes(url)) {
        return description;
    }

    return "■Project\n" + url + "\n\n" + description;
}

/**
 * buildScrapboxUrl の動作をLoggerで確認する
 */
function testBuildScrapboxUrl() {
    const project = PROJECTS[0];

    Logger.log("Project : " + project.title);
    Logger.log("Generated URL : " + buildScrapboxUrl(project));
}
