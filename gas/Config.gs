/**
 * Version 0.1
 * config/projects.yaml をもとにした静的なProject設定
 */
function getConfig() {

  return {

    dryRun: false,

    lookAheadDays: 60,

    maxUpdates: 999,

  };

}
const PROJECTS = [
    {
        id: "yamaguchi-miyu",
        title: "山口瑞悠",
        keywords: [
            "山口瑞悠","瑞悠","みゆう","miyu"
        ],
        aliases: [
            "みゆう",
        ],
        category: "student",
        scrapbox: {
            project: "musestudio",
            page: "山口瑞悠",
        },
        calendar: {
            enabled: true,
        },
    },
    {
        id: "fukukuru-20260718",
        title: "ふくくるさんぽ",
        keywords: [
            "ふくくるさんぽ",
        ],
        aliases: [
            "ふくくる",
        ],
        category: "event",
        scrapbox: {
            project: "muselab",
            page: "ふくくるさんぽ-26/7/18(土)",
        },
        calendar: {
            enabled: true,
        },
    },
    {
        id: "solo-chorus",
        title: "一人合唱",
        keywords: [
            "一人合唱",
            "一人合唱インタフェース",
        ],
        category: "research",
        scrapbox: {
            project: "musestudio",
            page: "一人合唱インタフェース",
        },
    },
    {
        id: "sigmus147",
        title: "SIGMUS147",
        keywords: [
            "SIGMUS147",
        ],
        category: "conference",
        status: "active",
        scrapbox: {
            project: "muselab",
            page: "SIGMUS147",
        },
        calendar: {
            enabled: true,
        },
        github: {
            repo: "muse-studio/calendar-scrapbox-sync",
        },
    },
];

/**
 * PROJECTS の内容をLoggerで確認する
 */
function testProjects() {
    Logger.log("=== PROJECTS ===");
    Logger.log("Count: " + PROJECTS.length);

    PROJECTS.forEach((project) => {
        Logger.log("----------------------------------------");
        Logger.log("ID : " + project.id);
        Logger.log("Title : " + project.title);
        Logger.log("Keywords : " + project.keywords.join(", "));

        if (project.aliases) {
            Logger.log("Aliases : " + project.aliases.join(", "));
        }

        Logger.log("Scrapbox : https://scrapbox.io/" + project.scrapbox.project + "/" + project.scrapbox.page);
    });
}
