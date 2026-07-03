/**
 * Version 0.1
 * config/projects.yaml をもとにした静的なProject設定
 */
const PROJECTS = [
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
            project: "muselab",
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
