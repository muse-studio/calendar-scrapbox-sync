/**
 * Version 0.1
 * Google Calendar から今後60日間の予定を取得してログに表示する
 */
const config = getConfig();

function listUpcomingEvents() {
    const calendar = CalendarApp.getDefaultCalendar();

    const now = new Date();

    const end = new Date(now);
    end.setDate(end.getDate() + config.lookAheadDays);

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

        logEvent(event, project, url, description, newDescription, shouldUpdate);

        if (shouldUpdate && updateCount < config.maxUpdates) {
            updateCount++;
            updateEventDescription(event, newDescription);
        }
    });
    Logger.log("----------------------------------------");
    Logger.log("Summary");
    Logger.log("Events : " + events.length);
    Logger.log("Updates: " + updateCount);
    Logger.log("config.dryRun: " + config.dryRun);
    Logger.log("Look ahead days: " + config.lookAheadDays);
}

/**
 * イベントの処理結果をLoggerへ出力する
 */
function logEvent(event, project, url, description, newDescription, shouldUpdate) {
    Logger.log("----------------------------------------");
    Logger.log("Title: " + event.getTitle());
    Logger.log("");
    Logger.log("Current Description:");
    Logger.log(description || "(empty)");
    Logger.log("");

    Logger.log("Matched:");
    Logger.log(project ? project.title : "(none)");

    if (project) {
        Logger.log("");
        Logger.log("URL:");
        Logger.log(url);
    }

    Logger.log("");
    Logger.log("New Description:");
    Logger.log(newDescription || "(empty)");
    Logger.log("");
    Logger.log("Action:");

    if (!shouldUpdate) {
        Logger.log("No Change");
    } else if (config.dryRun) {
        Logger.log("Would Update");
    } else {
        Logger.log("Updated");
    }
}

/**
 * イベント説明を更新する
 */
function updateEventDescription(event, newDescription) {
    if (config.dryRun) {
        return;
    }

    event.setDescription(newDescription);
}

/**
 * Projectセクションを生成する
 */
function buildProjectSection(url) {
    return "■Project\n" + url;
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
    const projectSection = buildProjectSection(url);

    if (!description) {
        return projectSection;
    }

    if (description.includes(url)) {
        return description;
    }

    return projectSection + "\n\n" + description;
}

/**
 * buildScrapboxUrl の動作をLoggerで確認する
 */
function testBuildScrapboxUrl() {
    const project = PROJECTS[0];

    Logger.log("Project : " + project.title);
    Logger.log("Generated URL : " + buildScrapboxUrl(project));
}
