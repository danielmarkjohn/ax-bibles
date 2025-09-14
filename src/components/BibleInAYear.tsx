import React, { useState } from 'react';

interface BibleInAYearProps {
  onBack: () => void;
}

const readingPlan = {
  title: "Daily Bible Reading",
  description: "Reading the Bible is a rewarding experience and one of the most important daily habits you can develop. It's never too late to start and our annual reading plan makes it easy to progress through all 66 books.",
  structure: "Organised into semi-chronological order, City's reading plan is divided into 16 key sections to guide you through the Bible in one year. There is a maximum of four chapters to read daily, which often includes a Psalm.",
  months: [
    {
      month: "January",
      range: "Genesis 1 to Exodus 40",
      sections: [
        {
          title: "Creation and Fall",
          description: "The beginning of the world and humanity's first act of disobedience.",
          readings: [
            "1 Jan: Genesis 1-3, Psalm 1",
            "2 Jan: Genesis 4-6, Psalm 2",
            "3 Jan: Genesis 7-9, Psalm 3",
            "4 Jan: Genesis 10-11, Psalm 4"
          ]
        },
        {
          title: "Abrahamic Covenant",
          description: "God's promises to Abraham, establishing a foundational covenant for the Israelites.",
          readings: [
            "5 Jan: Genesis 12-14, Psalm 5",
            "6 Jan: Genesis 15-17, Psalm 6",
            "7 Jan: Genesis 18-20, Psalm 7",
            "8 Jan: Genesis 21-23, Psalm 8",
            "9 Jan: Genesis 24-26, Psalm 9",
            "10 Jan: Genesis 27-29, Psalm 10",
            "11 Jan: Genesis 30-32, Psalm 11",
            "12 Jan: Genesis 33-35, Psalm 12",
            "13 Jan: Genesis 36-38, Psalm 13",
            "14 Jan: Genesis 39-41, Psalm 14",
            "15 Jan: Genesis 42-44, Psalm 15",
            "16 Jan: Genesis 45-47, Psalm 16",
            "17 Jan: Genesis 48-50, Psalm 17"
          ]
        },
        {
          title: "Exodus from Egypt",
          description: "The dramatic escape of the Israelites from slavery and their journey out of Egypt.",
          readings: [
            "18 Jan: Exodus 1-3, Psalm 18",
            "19 Jan: Exodus 4-6, Psalm 19",
            "20 Jan: Exodus 7-9, Psalm 20",
            "21 Jan: Exodus 10-12, Psalm 21",
            "22 Jan: Exodus 13-15, Psalm 22",
            "23 Jan: Exodus 16-18, Psalm 23"
          ]
        },
        {
          title: "Covenant at Mt. Sinai",
          description: "God gives the Ten Commandments to Moses and establishes a covenant with them.",
          readings: [
            "24 Jan: Exodus 19-21, Psalm 24",
            "25 Jan: Exodus 22-24, Psalm 25",
            "26 Jan: Exodus 25-27, Psalm 26",
            "27 Jan: Exodus 28-30, Psalm 27",
            "28 Jan: Exodus 31-33, Psalm 28",
            "29 Jan: Exodus 34-36, Psalm 29",
            "30 Jan: Exodus 37-38, Psalm 30",
            "31 Jan: Exodus 39-40, Psalm 31"
          ]
        }
      ]
    },
    {
      month: "February",
      range: "Leviticus 1 to Deuteronomy 21",
      sections: [
        {
          title: "Laws and Sacrifices",
          description: "God's instructions for worship and holy living.",
          readings: [
            "1 Feb: Leviticus 1-3, Psalm 32",
            "2 Feb: Leviticus 4-6, Psalm 33",
            "3 Feb: Leviticus 7-9, Psalm 34",
            "4 Feb: Leviticus 10-12, Psalm 35",
            "5 Feb: Leviticus 13-15, Psalm 36",
            "6 Feb: Leviticus 16-18, Psalm 37",
            "7 Feb: Leviticus 19-21, Psalm 38",
            "8 Feb: Leviticus 22-24, Psalm 39",
            "9 Feb: Leviticus 25-27, Psalm 40"
          ]
        },
        {
          title: "The Wilderness",
          description: "The Israelites' 40-year journey through the desert, marked by trials and divine guidance.",
          readings: [
            "10 Feb: Numbers 1-3, Psalm 41",
            "11 Feb: Numbers 4-6, Psalm 42",
            "12 Feb: Numbers 7-9, Psalm 43",
            "13 Feb: Numbers 10-12, Psalm 44",
            "14 Feb: Numbers 13-15, Psalm 45",
            "15 Feb: Numbers 16-18, Psalm 46",
            "16 Feb: Numbers 19-21, Psalm 47",
            "17 Feb: Numbers 22-24, Psalm 48",
            "18 Feb: Numbers 25-27, Psalm 49",
            "19 Feb: Numbers 28-30, Psalm 50",
            "20 Feb: Numbers 31-33, Psalm 51",
            "21 Feb: Numbers 34-36, Psalm 52",
            "22 Feb: Deuteronomy 1-3, Psalm 53",
            "23 Feb: Deuteronomy 4-6, Psalm 54",
            "24 Feb: Deuteronomy 7-9, Psalm 55",
            "25 Feb: Deuteronomy 10-12, Psalm 56",
            "26 Feb: Deuteronomy 13-15, Psalm 57",
            "27 Feb: Deuteronomy 16-18, Psalm 58",
            "28 Feb: Deuteronomy 19-21, Psalm 59"
          ]
        }
      ]
    },
    {
      month: "March",
      range: "Deuteronomy 22 to 1 Samuel 27",
      sections: [
        {
          title: "Final Instructions",
          description: "Moses' final words to the Israelites before entering the Promised Land.",
          readings: [
            "1 Mar: Deuteronomy 22-24, Psalm 60",
            "2 Mar: Deuteronomy 25-27, Psalm 61",
            "3 Mar: Deuteronomy 28-30, Psalm 62",
            "4 Mar: Deuteronomy 31-32, Psalm 63",
            "5 Mar: Deuteronomy 33-34, Psalm 64"
          ]
        },
        {
          title: "The Promised Land",
          description: "The conquest and settlement of Canaan, recording the fulfillment of God's promise to the Israelites.",
          readings: [
            "6 Mar: Joshua 1-3, Psalm 65",
            "7 Mar: Joshua 4-6, Psalm 66",
            "8 Mar: Joshua 7-9, Psalm 67",
            "9 Mar: Joshua 10-12, Psalm 68",
            "10 Mar: Joshua 13-15, Psalm 69",
            "11 Mar: Joshua 16-18, Psalm 70",
            "12 Mar: Joshua 19-21, Psalm 71",
            "13 Mar: Joshua 22-24, Psalm 72",
            "14 Mar: Judges 1-3, Psalm 73",
            "15 Mar: Judges 4-6, Psalm 74",
            "16 Mar: Judges 7-9, Psalm 75",
            "17 Mar: Judges 10-12, Psalm 76",
            "18 Mar: Judges 13-15, Psalm 77",
            "19 Mar: Judges 16-18, Psalm 78",
            "20 Mar: Judges 19-21, Psalm 79"
          ]
        },
        {
          title: "Israel's Rise and Fall",
          description: "The establishment, prosperity, and eventual decline of the Israelite kingdom.",
          readings: [
            "21 Mar: Ruth 1-2, Psalm 80",
            "22 Mar: Ruth 3-4, Psalm 81",
            "23 Mar: 1 Samuel 1-3, Psalm 82",
            "24 Mar: 1 Samuel 4-6, Psalm 83",
            "25 Mar: 1 Samuel 7-9, Psalm 84",
            "26 Mar: 1 Samuel 10-12, Psalm 85",
            "27 Mar: 1 Samuel 13-15, Psalm 86",
            "28 Mar: 1 Samuel 16-18, Psalm 87",
            "29 Mar: 1 Samuel 19-21, Psalm 88",
            "30 Mar: 1 Samuel 22-24, Psalm 89",
            "31 Mar: 1 Samuel 25-27, Psalm 90"
          ]
        }
      ]
    },
    {
      month: "April",
      range: "1 Samuel 28 to Isaiah 9",
      sections: [
        {
          title: "David's Kingdom",
          description: "The rise of David and the establishment of Israel's golden age.",
          readings: [
            "1 Apr: 1 Samuel 28-29, Psalm 91",
            "2 Apr: 1 Samuel 30-31, Psalm 92",
            "3 Apr: 2 Samuel 1-3, Psalm 93",
            "4 Apr: 2 Samuel 4-6, Psalm 94",
            "5 Apr: 2 Samuel 7-9, Psalm 95",
            "6 Apr: 2 Samuel 10-12, Psalm 96",
            "7 Apr: 2 Samuel 13-15, Psalm 97",
            "8 Apr: 2 Samuel 16-18, Psalm 98",
            "9 Apr: 2 Samuel 19-21, Psalm 99",
            "10 Apr: 2 Samuel 22-24, Psalm 100"
          ]
        },
        {
          title: "Solomon's Reign",
          description: "The wisdom and glory of Solomon's kingdom.",
          readings: [
            "11 Apr: 1 Kings 1-3, Psalm 101",
            "12 Apr: 1 Kings 4-6, Psalm 102",
            "13 Apr: 1 Kings 7-9, Psalm 103",
            "14 Apr: 1 Kings 10-12, Psalm 104",
            "15 Apr: 1 Kings 13-15, Psalm 105",
            "16 Apr: 1 Kings 16-18, Psalm 106",
            "17 Apr: 1 Kings 19-20, Psalm 107",
            "18 Apr: 1 Kings 21-22, Psalm 108",
            "19 Apr: 2 Kings 1-3, Psalm 109",
            "20 Apr: 2 Kings 4-6, Psalm 110",
            "21 Apr: 2 Kings 7-9, Psalm 111",
            "22 Apr: 2 Kings 10-12, Psalm 112",
            "23 Apr: 2 Kings 13-15, Psalm 113",
            "24 Apr: 2 Kings 16-18, Psalm 114",
            "25 Apr: 2 Kings 19-21, Psalm 115",
            "26 Apr: 2 Kings 22-23, Psalm 116",
            "27 Apr: 2 Kings 24-25, Psalm 117"
          ]
        },
        {
          title: "The Prophets Before The Exile",
          description: "Messages of warning and hope from prophets preceding the Babylonian exile.",
          readings: [
            "28 Apr: Isaiah 1-3, Psalm 118",
            "29 Apr: Isaiah 4-6, Psalm 119",
            "30 Apr: Isaiah 7-9, Psalm 120"
          ]
        }
      ]
    },
    {
      month: "May",
      range: "Isaiah 10 to Jeremiah 36",
      sections: [
        {
          title: "Isaiah's Prophecies",
          description: "Prophecies of judgment and restoration through the Messiah.",
          readings: [
            "1 May: Isaiah 10-12, Psalm 121",
            "2 May: Isaiah 13-15, Psalm 122",
            "3 May: Isaiah 16-18, Psalm 123",
            "4 May: Isaiah 19-21, Psalm 124",
            "5 May: Isaiah 22-24, Psalm 125",
            "6 May: Isaiah 25-27, Psalm 126",
            "7 May: Isaiah 28-30, Psalm 127",
            "8 May: Isaiah 31-33, Psalm 128",
            "9 May: Isaiah 34-36, Psalm 129",
            "10 May: Isaiah 37-39, Psalm 130",
            "11 May: Isaiah 40-42, Psalm 131",
            "12 May: Isaiah 43-45, Psalm 132",
            "13 May: Isaiah 46-48, Psalm 133",
            "14 May: Isaiah 49-51, Psalm 134",
            "15 May: Isaiah 52-54, Psalm 135",
            "16 May: Isaiah 55-57, Psalm 136",
            "17 May: Isaiah 58-60, Psalm 137",
            "18 May: Isaiah 61-63, Psalm 138",
            "19 May: Isaiah 64-66, Psalm 139"
          ]
        },
        {
          title: "Jeremiah's Call",
          description: "The weeping prophet's messages to a rebellious nation.",
          readings: [
            "20 May: Jeremiah 1-3, Psalm 140",
            "21 May: Jeremiah 4-6, Psalm 141",
            "22 May: Jeremiah 7-9, Psalm 142",
            "23 May: Jeremiah 10-12, Psalm 143",
            "24 May: Jeremiah 13-15, Psalm 144",
            "25 May: Jeremiah 16-18, Psalm 145",
            "26 May: Jeremiah 19-21, Psalm 146",
            "27 May: Jeremiah 22-24, Psalm 147",
            "28 May: Jeremiah 25-27, Psalm 148",
            "29 May: Jeremiah 28-30, Psalm 149",
            "30 May: Jeremiah 31-33, Psalm 150",
            "31 May: Jeremiah 34-36"
          ]
        }
      ]
    },
    {
      month: "June",
      range: "Jeremiah 37 to Ezekiel 15",
      sections: [
        {
          title: "Jerusalem's Fall",
          description: "The final days of Jerusalem and the beginning of exile.",
          readings: [
            "1 Jun: Jeremiah 37-39",
            "2 Jun: Jeremiah 40-42",
            "3 Jun: Jeremiah 43-45",
            "4 Jun: Jeremiah 46-48",
            "5 Jun: Jeremiah 49-50",
            "6 Jun: Jeremiah 51-52"
          ]
        },
        {
          title: "Minor Prophets",
          description: "Messages from the twelve minor prophets.",
          readings: [
            "7 Jun: Hosea 1-3",
            "8 Jun: Hosea 4-6",
            "9 Jun: Hosea 7-9",
            "10 Jun: Hosea 10-12",
            "11 Jun: Hosea 13-14",
            "12 Jun: Joel 1-3",
            "13 Jun: Amos 1-3",
            "14 Jun: Amos 4-6",
            "15 Jun: Amos 7-9",
            "16 Jun: Jonah 1-4",
            "17 Jun: Micah 1-3",
            "18 Jun: Micah 4-5",
            "19 Jun: Micah 6-7",
            "20 Jun: Nahum 1-3",
            "21 Jun: Habakkuk 1-3",
            "22 Jun: Zephaniah 1-3"
          ]
        },
        {
          title: "The Exile",
          description: "Recounts the period when the Israelites were taken captive to Babylon.",
          readings: [
            "23 Jun: Lamentations 1-3",
            "24 Jun: Lamentations 4-5",
            "25 Jun: Obadiah 1",
            "26 Jun: Ezekiel 1-3",
            "27 Jun: Ezekiel 4-6",
            "28 Jun: Ezekiel 7-9",
            "29 Jun: Ezekiel 10-12",
            "30 Jun: Ezekiel 13-15"
          ]
        }
      ]
    },
    {
      month: "July",
      range: "Ezekiel 16 to Zechariah 6",
      sections: [
        {
          title: "Ezekiel's Visions",
          description: "Prophetic visions of judgment and restoration.",
          readings: [
            "1 Jul: Ezekiel 16-18, Psalm 1",
            "2 Jul: Ezekiel 19-21, Psalm 2",
            "3 Jul: Ezekiel 22-24, Psalm 3",
            "4 Jul: Ezekiel 25-27, Psalm 4",
            "5 Jul: Ezekiel 28-30, Psalm 5",
            "6 Jul: Ezekiel 31-33, Psalm 6",
            "7 Jul: Ezekiel 34-36, Psalm 7",
            "8 Jul: Ezekiel 37-39, Psalm 8",
            "9 Jul: Ezekiel 40-42, Psalm 9",
            "10 Jul: Ezekiel 43-45, Psalm 10",
            "11 Jul: Ezekiel 46-48, Psalm 11"
          ]
        },
        {
          title: "Daniel's Prophecies",
          description: "Visions and prophecies during the Babylonian captivity.",
          readings: [
            "12 Jul: Daniel 1-3, Psalm 12",
            "13 Jul: Daniel 4-6, Psalm 13",
            "14 Jul: Daniel 7-9, Psalm 14",
            "15 Jul: Daniel 10-12, Psalm 15",
            "16 Jul: Esther 1-3, Psalm 16",
            "17 Jul: Esther 4-6, Psalm 17",
            "18 Jul: Esther 7-8, Psalm 18",
            "19 Jul: Esther 9-10, Psalm 19"
          ]
        },
        {
          title: "Return From Exile",
          description: "The return of the Israelites to their homeland and rebuilding of Jerusalem.",
          readings: [
            "20 Jul: Ezra 1-3, Psalm 20",
            "21 Jul: Ezra 4-6, Psalm 21",
            "22 Jul: Ezra 7-8, Psalm 22",
            "23 Jul: Ezra 9-10, Psalm 23",
            "24 Jul: Nehemiah 1-3, Psalm 24",
            "25 Jul: Nehemiah 4-6, Psalm 25",
            "26 Jul: Nehemiah 7-9, Psalm 26",
            "27 Jul: Nehemiah 10-11, Psalm 27",
            "28 Jul: Nehemiah 12-13, Psalm 28",
            "29 Jul: Haggai 1-2, Psalm 29",
            "30 Jul: Zechariah 1-3, Psalm 30",
            "31 Jul: Zechariah 4-6, Psalm 31"
          ]
        }
      ]
    },
    {
      month: "August",
      range: "Zechariah 7 to Job 12",
      sections: [
        {
          title: "Final Prophets",
          description: "The last messages from the Old Testament prophets.",
          readings: [
            "1 Aug: Zechariah 7-9, Psalm 32",
            "2 Aug: Zechariah 10-12, Psalm 33",
            "3 Aug: Zechariah 13-14, Psalm 34",
            "4 Aug: Malachi 1-2, Psalm 35",
            "5 Aug: Malachi 3-4, Psalm 36"
          ]
        },
        {
          title: "The Story So Far",
          description: "A recap of key events and themes through Chronicles.",
          readings: [
            "6 Aug: 1 Chronicles 1-3, Psalm 37",
            "7 Aug: 1 Chronicles 4-6, Psalm 38",
            "8 Aug: 1 Chronicles 7-9, Psalm 39",
            "9 Aug: 1 Chronicles 10-12, Psalm 40",
            "10 Aug: 1 Chronicles 13-15, Psalm 41",
            "11 Aug: 1 Chronicles 16-18, Psalm 42",
            "12 Aug: 1 Chronicles 19-21, Psalm 43",
            "13 Aug: 1 Chronicles 22-24, Psalm 44",
            "14 Aug: 1 Chronicles 25-27, Psalm 45",
            "15 Aug: 1 Chronicles 28-29, Psalm 46",
            "16 Aug: 2 Chronicles 1-3, Psalm 47",
            "17 Aug: 2 Chronicles 4-6, Psalm 48",
            "18 Aug: 2 Chronicles 7-9, Psalm 49",
            "19 Aug: 2 Chronicles 10-12, Psalm 50",
            "20 Aug: 2 Chronicles 13-15, Psalm 51",
            "21 Aug: 2 Chronicles 16-18, Psalm 52",
            "22 Aug: 2 Chronicles 19-21, Psalm 53",
            "23 Aug: 2 Chronicles 22-24, Psalm 54",
            "24 Aug: 2 Chronicles 25-27, Psalm 55",
            "25 Aug: 2 Chronicles 28-30, Psalm 56",
            "26 Aug: 2 Chronicles 31-33, Psalm 57",
            "27 Aug: 2 Chronicles 34-36, Psalm 58"
          ]
        },
        {
          title: "The Wisdom Of Israel",
          description: "The wisdom literature of the Bible, offering insights into life, faith, and morality.",
          readings: [
            "28 Aug: Job 1-3, Psalm 59",
            "29 Aug: Job 4-6, Psalm 60",
            "30 Aug: Job 7-9, Psalm 61",
            "31 Aug: Job 10-12, Psalm 62"
          ]
        }
      ]
    },
    {
      month: "September",
      range: "Job 13 to Matthew 6",
      sections: [
        {
          title: "Job's Trials",
          description: "The story of suffering, faith, and God's sovereignty.",
          readings: [
            "1 Sep: Job 13-15, Psalm 63",
            "2 Sep: Job 16-18, Psalm 64",
            "3 Sep: Job 19-21, Psalm 65",
            "4 Sep: Job 22-24, Psalm 66",
            "5 Sep: Job 25-27, Psalm 67",
            "6 Sep: Job 28-30, Psalm 68",
            "7 Sep: Job 31-33, Psalm 69",
            "8 Sep: Job 34-36, Psalm 70",
            "9 Sep: Job 37-39, Psalm 71",
            "10 Sep: Job 40-42, Psalm 72"
          ]
        },
        {
          title: "Wisdom Literature",
          description: "Proverbs and wisdom for daily living.",
          readings: [
            "11 Sep: Proverbs 1-3, Psalm 73",
            "12 Sep: Proverbs 4-6, Psalm 74",
            "13 Sep: Proverbs 7-9, Psalm 75",
            "14 Sep: Proverbs 10-12, Psalm 76",
            "15 Sep: Proverbs 13-15, Psalm 77",
            "16 Sep: Proverbs 16-18, Psalm 78",
            "17 Sep: Proverbs 19-21, Psalm 79",
            "18 Sep: Proverbs 22-24, Psalm 80",
            "19 Sep: Proverbs 25-27, Psalm 81",
            "20 Sep: Proverbs 28-29, Psalm 82",
            "21 Sep: Proverbs 30-31, Psalm 83",
            "22 Sep: Ecclesiastes 1-3, Psalm 84",
            "23 Sep: Ecclesiastes 4-6, Psalm 85",
            "24 Sep: Ecclesiastes 7-9, Psalm 86",
            "25 Sep: Ecclesiastes 10-12, Psalm 87",
            "26 Sep: Song of Solomon 1-3, Psalm 88",
            "27 Sep: Song of Solomon 4-6, Psalm 89",
            "28 Sep: Song of Solomon 7-8, Psalm 90"
          ]
        },
        {
          title: "The Good News",
          description: "Introducing the life and teachings of Jesus Christ.",
          readings: [
            "29 Sep: Matthew 1-3, Psalm 91",
            "30 Sep: Matthew 4-6, Psalm 92"
          ]
        }
      ]
    },
    {
      month: "October",
      range: "Matthew 7 to Acts 6",
      sections: [
        {
          title: "Jesus' Ministry",
          description: "The teachings, miracles, and ministry of Jesus Christ.",
          readings: [
            "1 Oct: Matthew 7-9, Psalm 93",
            "2 Oct: Matthew 10-12, Psalm 94",
            "3 Oct: Matthew 13-15, Psalm 95",
            "4 Oct: Matthew 16-18, Psalm 96",
            "5 Oct: Matthew 19-21, Psalm 97",
            "6 Oct: Matthew 22-24, Psalm 98",
            "7 Oct: Matthew 25-26, Psalm 99",
            "8 Oct: Matthew 27-28, Psalm 100",
            "9 Oct: Mark 1-3, Psalm 101",
            "10 Oct: Mark 4-6, Psalm 102",
            "11 Oct: Mark 7-9, Psalm 103",
            "12 Oct: Mark 10-12, Psalm 104",
            "13 Oct: Mark 13-14, Psalm 105",
            "14 Oct: Mark 15-16, Psalm 106",
            "15 Oct: Luke 1-3, Psalm 107",
            "16 Oct: Luke 4-6, Psalm 108",
            "17 Oct: Luke 7-9, Psalm 109",
            "18 Oct: Luke 10-12, Psalm 110",
            "19 Oct: Luke 13-15, Psalm 111",
            "20 Oct: Luke 16-18, Psalm 112",
            "21 Oct: Luke 19-21, Psalm 113",
            "22 Oct: Luke 22-24, Psalm 114",
            "23 Oct: John 1-3, Psalm 115",
            "24 Oct: John 4-6, Psalm 116",
            "25 Oct: John 7-9, Psalm 117",
            "26 Oct: John 10-12, Psalm 118",
            "27 Oct: John 13-15, Psalm 119",
            "28 Oct: John 16-18, Psalm 120",
            "29 Oct: John 19-21, Psalm 121"
          ]
        },
        {
          title: "The Early Church",
          description: "The formation and growth of the early Christian community.",
          readings: [
            "30 Oct: Acts 1-3, Psalm 122",
            "31 Oct: Acts 4-6, Psalm 123"
          ]
        }
      ]
    },
    {
      month: "November",
      range: "Acts 7 to Philippians 4",
      sections: [
        {
          title: "Church Growth",
          description: "The spread of Christianity throughout the Roman Empire.",
          readings: [
            "1 Nov: Acts 7-9, Psalm 124",
            "2 Nov: Acts 10-12, Psalm 125",
            "3 Nov: Acts 13-15, Psalm 126",
            "4 Nov: Acts 16-18, Psalm 127",
            "5 Nov: Acts 19-21, Psalm 128",
            "6 Nov: Acts 22-24, Psalm 129",
            "7 Nov: Acts 25-26, Psalm 130",
            "8 Nov: Acts 27-28, Psalm 131"
          ]
        },
        {
          title: "Letters To The Church",
          description: "Paul's letters offering guidance and encouragement to early Christians.",
          readings: [
            "9 Nov: Romans 1-3, Psalm 132",
            "10 Nov: Romans 4-6, Psalm 133",
            "11 Nov: Romans 7-9, Psalm 134",
            "12 Nov: Romans 10-12, Psalm 135",
            "13 Nov: Romans 13-14, Psalm 136",
            "14 Nov: Romans 15-16, Psalm 137",
            "15 Nov: 1 Corinthians 1-3, Psalm 138",
            "16 Nov: 1 Corinthians 4-6, Psalm 139",
            "17 Nov: 1 Corinthians 7-9, Psalm 140",
            "18 Nov: 1 Corinthians 10-12, Psalm 141",
            "19 Nov: 1 Corinthians 13-14, Psalm 142",
            "20 Nov: 1 Corinthians 15-16, Psalm 143",
            "21 Nov: 2 Corinthians 1-3, Psalm 144",
            "22 Nov: 2 Corinthians 4-6, Psalm 145",
            "23 Nov: 2 Corinthians 7-9, Psalm 146",
            "24 Nov: 2 Corinthians 10-11, Psalm 147",
            "25 Nov: 2 Corinthians 12-13, Psalm 148",
            "26 Nov: Galatians 1-3, Psalm 149",
            "27 Nov: Galatians 4-6, Psalm 150",
            "28 Nov: Ephesians 1-3",
            "29 Nov: Ephesians 4-6",
            "30 Nov: Philippians 1-3"
          ]
        }
      ]
    },
    {
      month: "December",
      range: "Colossians 1 to Revelation 22",
      sections: [
        {
          title: "Final Letters",
          description: "The concluding epistles of the New Testament.",
          readings: [
            "1 Dec: Colossians 1-4",
            "2 Dec: 1 Thessalonians 1-3",
            "3 Dec: 1 Thessalonians 4-5",
            "4 Dec: 2 Thessalonians 1-3",
            "5 Dec: 1 Timothy 1-3",
            "6 Dec: 1 Timothy 4-6",
            "7 Dec: 2 Timothy 1-4",
            "8 Dec: Titus 1-3",
            "9 Dec: Philemon 1",
            "10 Dec: Hebrews 1-3",
            "11 Dec: Hebrews 4-6",
            "12 Dec: Hebrews 7-9",
            "13 Dec: Hebrews 10-11",
            "14 Dec: Hebrews 12-13",
            "15 Dec: James 1-3",
            "16 Dec: James 4-5",
            "17 Dec: 1 Peter 1-3",
            "18 Dec: 1 Peter 4-5",
            "19 Dec: 2 Peter 1-3",
            "20 Dec: 1 John 1-3",
            "21 Dec: 1 John 4-5",
            "22 Dec: 2, 3 John 1, 1",
            "23 Dec: Jude 1"
          ]
        },
        {
          title: "The Revelation",
          description: "The apocalyptic visions revealing the ultimate triumph of good over evil.",
          readings: [
            "24 Dec: Revelation 1-3",
            "25 Dec: Revelation 4-6",
            "26 Dec: Revelation 7-9",
            "27 Dec: Revelation 10-12",
            "28 Dec: Revelation 13-15",
            "29 Dec: Revelation 16-18",
            "30 Dec: Revelation 19-20",
            "31 Dec: Revelation 21-22"
          ]
        }
      ]
    }
  ]
};

export default function BibleInAYear({ onBack }: BibleInAYearProps) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 backdrop-blur-sm px-4 py-4 flex items-center justify-between border-b border-purple-700/50 shadow-lg flex-shrink-0">
        <button
          onClick={onBack}
          className="p-2 text-purple-200 hover:text-white hover:bg-purple-700/50 rounded-xl transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-white font-semibold text-lg">Bible in a Year</span>
          <span className="text-purple-200 text-sm font-medium">Complete Reading Plan</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 mb-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{readingPlan.title}</h2>
            </div>
            
            <div className="space-y-4 text-purple-100">
              <p className="leading-relaxed">{readingPlan.description}</p>
              
              <div className="bg-white/10 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-2">Structure</h3>
                <p className="text-sm leading-relaxed">{readingPlan.structure}</p>
              </div>
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Reading Schedule</h3>
            
            {readingPlan.months.map((monthData, monthIndex) => (
              <div key={monthIndex} className="bg-gray-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setSelectedMonth(selectedMonth === monthIndex ? null : monthIndex)}
                  className="w-full p-6 text-left hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white">{monthData.month}</h4>
                      <p className="text-purple-400 font-medium">{monthData.range}</p>
                    </div>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transition-transform ${
                        selectedMonth === monthIndex ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {selectedMonth === monthIndex && (
                  <div className="px-6 pb-6 space-y-6">
                    {monthData.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="bg-gray-700 rounded-xl p-4">
                        <h5 className="text-lg font-bold text-white mb-2">{section.title}</h5>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{section.description}</p>
                        
                        <div className="space-y-2">
                          {section.readings.map((reading, readingIndex) => (
                            <div key={readingIndex} className="flex items-center space-x-3 p-2 bg-gray-600 rounded-lg">
                              <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-200 text-sm font-mono">{reading}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Coming Soon */}
            <div className="bg-gray-800 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Complete Plan Coming Soon</h4>
              <p className="text-gray-400">We're adding all 12 months with detailed daily readings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
