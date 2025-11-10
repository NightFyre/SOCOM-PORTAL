// // SCOREBOARD UI

// Auto-generated UI snippet (Container_ScoreboardMain) 10/23/2025, 7:10:45 AM
const containerScoreboardmainWidget = modlib.ParseUI(
  {
    name: "Container_ScoreboardMain",
    type: "Container",
    position: [0, 0],
    size: [1920, 1080],
    anchor: mod.UIAnchor.Center,
    visible: true,
    padding: 0,
    bgColor: [0.0314, 0.0431, 0.0431],
    bgAlpha: 1,
    bgFill: mod.UIBgFill.Blur,
    children: [
      {
        name: "Container_ScoreboardMain_Outline",
        type: "Container",
        position: [0, 0],
        size: [1880, 1040],
        anchor: mod.UIAnchor.Center,
        visible: true,
        padding: 0,
        bgColor: [1, 0.9882, 0.6118],
        bgAlpha: 1,
        bgFill: mod.UIBgFill.OutlineThin
      },
      {
        name: "Container_ScoreboardMain_Entry",
        type: "Container",
        position: [0, 0],
        size: [1880, 1040],
        anchor: mod.UIAnchor.Center,
        visible: true,
        padding: 0,
        bgColor: [0.0745, 0.1843, 0.2471],
        bgAlpha: 1,
        bgFill: mod.UIBgFill.Blur,
        children: [
          {
            name: "Container_MainBody_ScoreHeader",
            type: "Container",
            position: [0, 0],
            size: [1880, 200],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [1, 1, 1],
            bgAlpha: 1,
            bgFill: mod.UIBgFill.OutlineThin,
            children: [
              {
                name: "Text_MainBody_RoundNumber",
                type: "Text",
                position: [0, 0],
                size: [400, 50],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_MainBody_RoundNumber,
                textColor: [1, 1, 1],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Text_ScoreboardTimer",
                type: "Text",
                position: [0, 0],
                size: [400, 50],
                anchor: mod.UIAnchor.BottomRight,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_ScoreboardTimer,
                textColor: [1, 1, 1],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              }
            ]
          },
          {
            name: "Container_MainBody_SealScoreHeader",
            type: "Container",
            position: [-470, 200],
            size: [940, 50],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [0.2, 0.2, 0.2],
            bgAlpha: 1,
            bgFill: mod.UIBgFill.None,
            children: [
              {
                name: "Text_SealScoreHeader_TeamName",
                type: "Text",
                position: [0, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.CenterLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_SealScoreHeader_TeamName,
                textColor: [1, 1, 1],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Text_SealScoreHeader_RoundConditionName",
                type: "Text",
                position: [0, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.CenterRight,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_SealScoreHeader_RoundConditionName,
                textColor: [1, 0.9882, 0.6118],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Container_SealScoreHeader_Kills",
                type: "Container",
                position: [540, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_SealScoreHeader_Kills",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_SealScoreHeader_Kills,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_SealScoreHeader_Deaths",
                type: "Container",
                position: [640, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_SealScoreHeader_Deaths",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_SealScoreHeader_Deaths,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_SealScoreHeader_Assists",
                type: "Container",
                position: [740, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_SealScoreHeader_Assists",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_SealScoreHeader_Assists,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_SealScoreHeader_Score",
                type: "Container",
                position: [440, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_SealScoreHeader_Score",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_SealScoreHeader_Score,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              }
            ]
          },
          {
            name: "Container_MainBody_MercScoreHeader",
            type: "Container",
            position: [470, 200],
            size: [940, 50],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [0.2, 0.2, 0.2],
            bgAlpha: 1,
            bgFill: mod.UIBgFill.None,
            children: [
              {
                name: "Text_MercScoreHeader_TeamName",
                type: "Text",
                position: [0, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.CenterLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_MercScoreHeader_TeamName,
                textColor: [1, 1, 1],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Text_MearcScoreHeader_RoundConditionName",
                type: "Text",
                position: [0, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.CenterRight,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_MearcScoreHeader_RoundConditionName,
                textColor: [1, 0.9882, 0.6118],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Container_MercScoreHeader_Kills",
                type: "Container",
                position: [540, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_MercScoreHeader_Kills",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_MercScoreHeader_Kills,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_MercScoreHeader_Deaths",
                type: "Container",
                position: [640, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_MercScoreHeader_Deaths",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_MercScoreHeader_Deaths,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_MercScoreHeader_Assists",
                type: "Container",
                position: [740, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_MercScoreHeader_Assists",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_MercScoreHeader_Assists,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_MercScoreHeader_Score",
                type: "Container",
                position: [440, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_MercScoreHeader_Score",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_MercScoreHeader_Score,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              }
            ]
          },
          {
            name: "Container_MainBody_SealScore_Outline",
            type: "Container",
            position: [-470, 250],
            size: [940, 790],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [1, 1, 1],
            bgAlpha: 1,
            bgFill: mod.UIBgFill.OutlineThin
          },
          {
            name: "Container_MainBody_MercScore_Outline",
            type: "Container",
            position: [470, 250],
            size: [940, 790],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [1, 1, 1],
            bgAlpha: 1,
            bgFill: mod.UIBgFill.OutlineThin
          },
          {
            name: "Container_MainBody_SealScores",
            type: "Container",
            position: [-470, 250],
            size: [940, 790],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [0.2, 0.2, 0.2],
            bgAlpha: 0.3,
            bgFill: mod.UIBgFill.GradientTop,
            children: [
              {
                name: "Container_SealScore_1",
                type: "Container",
                position: [0, 0],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_2",
                type: "Container",
                position: [0, 49],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_2",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_Name_2",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_Name_2,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_Score_2",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_Score_2",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_Score_2,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_Kills_2",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_Kills_2",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_Kills_2,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_Deaths_2",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_Deaths_2",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_Deaths_2,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_3",
                type: "Container",
                position: [0, 98],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_4",
                type: "Container",
                position: [0, 147],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_5",
                type: "Container",
                position: [0, 196],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_6",
                type: "Container",
                position: [0, 245],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_7",
                type: "Container",
                position: [0, 294],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_8",
                type: "Container",
                position: [0, 339],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_9",
                type: "Container",
                position: [0, 388],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_10",
                type: "Container",
                position: [0, 437],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_11",
                type: "Container",
                position: [0, 486],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_12",
                type: "Container",
                position: [0, 535],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_13",
                type: "Container",
                position: [0, 584],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_14",
                type: "Container",
                position: [0, 633],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_15",
                type: "Container",
                position: [0, 682],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              },
              {
                name: "Container_SealScore_16",
                type: "Container",
                position: [0, 731],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Name_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Score_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Kills_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Deaths_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_SealScore_1_Assists_Copy2_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy_Copy,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: "Container_MainBody_MercScores",
            type: "Container",
            position: [470, 250],
            size: [940, 790],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [0.2, 0.2, 0.2],
            bgAlpha: 0.3,
            bgFill: mod.UIBgFill.GradientTop,
            children: [
              {
                name: "Container_MercScore_1",
                type: "Container",
                position: [0, 0],
                size: [940, 49],
                anchor: mod.UIAnchor.TopCenter,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Container_MercScore_1_Name",
                    type: "Container",
                    position: [0, 0],
                    size: [440, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_MercScore_1_Name",
                        type: "Text",
                        position: [0, 0],
                        size: [440, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 20,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_MercScore_1_Name,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.CenterLeft
                      }
                    ]
                  },
                  {
                    name: "Container_MercScore_1_Score",
                    type: "Container",
                    position: [440, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_MercScore_1_Score",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_MercScore_1_Score,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_MercScore_1_Kills",
                    type: "Container",
                    position: [540, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_MercScore_1_Kills",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_MercScore_1_Kills,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_MercScore_1_Deaths",
                    type: "Container",
                    position: [640, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_MercScore_1_Deaths",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_MercScore_1_Deaths,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  },
                  {
                    name: "Container_MercScore_1_Assists",
                    type: "Container",
                    position: [740, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    children: [
                      {
                        name: "Text_MercScore_1_Assists",
                        type: "Text",
                        position: [0, 0],
                        size: [100, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        padding: 0,
                        bgColor: [0.2, 0.2, 0.2],
                        bgAlpha: 1,
                        bgFill: mod.UIBgFill.None,
                        textLabel: mod.stringkeys.Text_MercScore_1_Assists,
                        textColor: [1, 1, 1],
                        textAlpha: 1,
                        textSize: 24,
                        textAnchor: mod.UIAnchor.Center
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
);


/* should this be its own class ? ? ?
*/

class CZScoreEntry
{
    txtName: mod.UIWidget | undefined;
    txtScore: mod.UIWidget | undefined;
    txtKills: mod.UIWidget | undefined;
    txtDeaths: mod.UIWidget | undefined;
    txtAssists: mod.UIWidget | undefined;

    Create(teamID: number, teamIndex: number) : void
    {
        // Parent Container =  "Container_MainBody_SealScores" || "Container_MainBody_MercScores"
        /*

        Containers
         - merc score entry
            -- name
            -- score
            -- kills
            -- deaths
            -- assists

        Body Params
          name: "Container_<Team>Score_<index>",
          type: "Container",
          position: [0, 49 * index],
          size: [940, 49],
          anchor: mod.UIAnchor.TopCenter,
          visible: true,
          padding: 0,
          bgColor: [0.2, 0.2, 0.2],
          bgAlpha: 1,
          bgFill: mod.UIBgFill.None,
          children: [
        */

        const scoreWidgetBody = mod.FindUIWidgetWithName("");
        if (!scoreWidgetBody)
            return; // failed to find the main score body


        let name = "Container_<Team>Score_<index>";

        /* create score widget for player */
        mod.AddUIContainer(
            name,                                   // name
            mod.CreateVector(0, teamIndex * 49, 0), // position
            mod.CreateVector(940, 49, 0),           // size
            mod.UIAnchor.TopCenter,                 // anchor
            scoreWidgetBody,                        // parent
            true,                                   // visible
            0,                                      // padding
            mod.CreateVector(0.2, 0.2, 0.2),        // bgColor
            1,                                      // bgAlpha
            mod.UIBgFill.None                       // bgFill
        );

        let scoreWidget = mod.FindUIWidgetWithName(name);
        if (!scoreWidget)
            return; // failed to find score widget

        /* append score entries to container */

        // NAME ENTRY
        mod.AddUIContainer(
            name,                                   // name
            mod.CreateVector(0, teamIndex * 49, 0), // position
            mod.CreateVector(940, 49, 0),           // size
            mod.UIAnchor.TopCenter,                 // anchor
            scoreWidget,                            // parent
            true,                                   // visible
            0,                                      // padding
            mod.CreateVector(0.2, 0.2, 0.2),        // bgColor
            1,                                      // bgAlpha
            mod.UIBgFill.None                       // bgFill
        );


        // ~ continued . . need to figure out string references for each UIWidget ~

    }
}

/* Score Entry Container 
returns the small widget for either name , score, kills, deaths, assists

  - Name pos = 0, 0 ; size = 440, 50 ; padding = 10 ; textAnchor = CenterLeft
  - Score pos = 440, 0 ; size = 100, 50 ; textAnchor = Center
  - Kills pos = 540, 0 ; size = 100, 50 ; textAnchor = Center
  - Deaths pos = 640, 0 ; size = 100, 50 ; textAnchor = Center
  - Assists pos = 740, 0 ; size = 100, 50 ; textAnchor = Center
  
*/

enum ESCORE_ENTRY_TYPE
{
    NAME,
    SCORE,
    KILLS,
    DEATHS,
    ASSISTS
}
function __makeScoreEntryContainer(type: ESCORE_ENTRY_TYPE, parent: mod.UIWidget) : void
{

  let containerPadding = 0;
  let szContainer = [100, 50];
  let posContainer = [0, 0];
  let containerTextAnchor = mod.UIAnchor.Center;

  switch (type)
  {
    case ESCORE_ENTRY_TYPE.NAME:
        containerPadding = 10;
        szContainer = [440, 50];
        posContainer = [0, 0];
        containerTextAnchor = mod.UIAnchor.CenterLeft;
        break;
    case ESCORE_ENTRY_TYPE.SCORE:
        szContainer = [100, 50];
        posContainer = [440, 0];
        containerTextAnchor = mod.UIAnchor.Center;
        break;
    case ESCORE_ENTRY_TYPE.KILLS:
        szContainer = [100, 50];
        posContainer = [540, 0];
        containerTextAnchor = mod.UIAnchor.Center;
        break;
    case ESCORE_ENTRY_TYPE.DEATHS:
        szContainer = [100, 50];
        posContainer = [640, 0];
        containerTextAnchor = mod.UIAnchor.Center;
        break;
    case ESCORE_ENTRY_TYPE.ASSISTS:
        szContainer = [100, 50];
        posContainer = [740, 0];
        containerTextAnchor = mod.UIAnchor.Center;
        break;

    default: return;
  }

  modlib.ParseUI(
    {
      name: "",
      type: "Container",
      position: posContainer,
      size: szContainer,
      anchor: mod.UIAnchor.TopLeft,
      parent: parent,
      visible: true,
      padding: containerPadding,
      bgColor: [0.2, 0.2, 0.2],
      bgAlpha: 1,
      bgFill: mod.UIBgFill.None,
      children: [
        {
          name: "",
          type: "Text",
          position: [0, 0],
          size: szContainer,
          anchor: mod.UIAnchor.TopLeft,
          visible: true,
          padding: 0,
          bgColor: [0.2, 0.2, 0.2],
          bgAlpha: 1,
          bgFill: mod.UIBgFill.None,
          textLabel: mod.stringkeys.Text_MercScore_1_Assists,
          textColor: [1, 1, 1],
          textAlpha: 1,
          textSize: 24,
          textAnchor: containerTextAnchor
        }
      ]
    }
  );

}


/* simplified version 

contains:
  - Scoreboard Main Container w/ Outline Container
  - Scoreboard Entry Container
  - Score Main Body for each team

*/




// Auto-generated UI snippet (Container_ScoreboardMain) 10/31/2025, 9:39:37 AM
const containerScoreboardmainWidget_2 = modlib.ParseUI(
  {
    name: "Container_ScoreboardMain",
    type: "Container",
    position: [0, 0],
    size: [1920, 1080],
    anchor: mod.UIAnchor.Center,
    visible: true,
    padding: 0,
    bgColor: [0.0314, 0.0431, 0.0431],
    bgAlpha: 1,
    bgFill: mod.UIBgFill.Blur,
    children: [
      {
        name: "Container_ScoreboardMain_Outline",
        type: "Container",
        position: [0, 0],
        size: [1880, 1040],
        anchor: mod.UIAnchor.Center,
        visible: true,
        padding: 0,
        bgColor: [1, 0.9882, 0.6118],
        bgAlpha: 0.5,
        bgFill: mod.UIBgFill.OutlineThin
      },
      {
        name: "Container_ScoreboardMain_Entry",
        type: "Container",
        position: [0, 0],
        size: [1880, 1040],
        anchor: mod.UIAnchor.Center,
        visible: true,
        padding: 0,
        bgColor: [0.0745, 0.1843, 0.2471],
        bgAlpha: 1,
        bgFill: mod.UIBgFill.Blur,
        children: [
          {
            name: "Container_MainBody_ScoreHeader",
            type: "Container",
            position: [0, 0],
            size: [1880, 200],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [1, 1, 1],
            bgAlpha: 0.5,
            bgFill: mod.UIBgFill.OutlineThin,
            children: [
              {
                name: "Text_MainBody_RoundNumber",
                type: "Text",
                position: [0, 0],
                size: [600, 200],
                anchor: mod.UIAnchor.Center,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_MainBody_RoundNumber,
                textColor: [1, 1, 1],
                textAlpha: 0.8,
                textSize: 90,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Text_ScoreboardTimer",
                type: "Text",
                position: [0, 0],
                size: [400, 50],
                anchor: mod.UIAnchor.BottomRight,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_ScoreboardTimer,
                textColor: [1, 1, 1],
                textAlpha: 0.8,
                textSize: 24,
                textAnchor: mod.UIAnchor.CenterRight
              }
            ]
          },
          {
            name: "Container_MainBody_SealScoreHeader",
            type: "Container",
            position: [-470, 200],
            size: [940, 50],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [0.2, 0.2, 0.2],
            bgAlpha: 1,
            bgFill: mod.UIBgFill.None,
            children: [
              {
                name: "Text_SealScoreHeader_TeamName",
                type: "Text",
                position: [0, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.CenterLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_SealScoreHeader_TeamName,
                textColor: [1, 1, 1],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Text_SealScoreHeader_RoundConditionName",
                type: "Text",
                position: [0, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.CenterRight,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_SealScoreHeader_RoundConditionName,
                textColor: [1, 0.9882, 0.6118],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Container_SealScoreHeader_Kills",
                type: "Container",
                position: [540, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_SealScoreHeader_Kills",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_SealScoreHeader_Kills,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_SealScoreHeader_Deaths",
                type: "Container",
                position: [640, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_SealScoreHeader_Deaths",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_SealScoreHeader_Deaths,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_SealScoreHeader_Assists",
                type: "Container",
                position: [740, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_SealScoreHeader_Assists",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_SealScoreHeader_Assists,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_SealScoreHeader_Score",
                type: "Container",
                position: [440, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_SealScoreHeader_Score",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_SealScoreHeader_Score,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              }
            ]
          },
          {
            name: "Container_MainBody_MercScoreHeader",
            type: "Container",
            position: [470, 200],
            size: [940, 50],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [0.2, 0.2, 0.2],
            bgAlpha: 1,
            bgFill: mod.UIBgFill.None,
            children: [
              {
                name: "Text_MercScoreHeader_TeamName",
                type: "Text",
                position: [0, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.CenterLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_MercScoreHeader_TeamName,
                textColor: [1, 1, 1],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Text_MearcScoreHeader_RoundConditionName",
                type: "Text",
                position: [0, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.CenterRight,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                textLabel: mod.stringkeys.Text_MearcScoreHeader_RoundConditionName,
                textColor: [1, 0.9882, 0.6118],
                textAlpha: 1,
                textSize: 24,
                textAnchor: mod.UIAnchor.Center
              },
              {
                name: "Container_MercScoreHeader_Kills",
                type: "Container",
                position: [540, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_MercScoreHeader_Kills",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_MercScoreHeader_Kills,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_MercScoreHeader_Deaths",
                type: "Container",
                position: [640, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_MercScoreHeader_Deaths",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_MercScoreHeader_Deaths,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_MercScoreHeader_Assists",
                type: "Container",
                position: [740, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_MercScoreHeader_Assists",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_MercScoreHeader_Assists,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              },
              {
                name: "Container_MercScoreHeader_Score",
                type: "Container",
                position: [440, 0],
                size: [100, 50],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [0.2, 0.2, 0.2],
                bgAlpha: 1,
                bgFill: mod.UIBgFill.None,
                children: [
                  {
                    name: "Text_MercScoreHeader_Score",
                    type: "Text",
                    position: [0, 0],
                    size: [100, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    textLabel: mod.stringkeys.Text_MercScoreHeader_Score,
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center
                  }
                ]
              }
            ]
          },
          {
            name: "Container_MainBody_SealScores",
            type: "Container",
            position: [-470, 250],
            size: [940, 790],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [0.2, 0.2, 0.2],
            bgAlpha: 0.3,
            bgFill: mod.UIBgFill.GradientTop,
            children: [
              {
                name: "Container_MainBody_SealScore_Outline",
                type: "Container",
                position: [0, 0],
                size: [940, 790],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [1, 1, 1],
                bgAlpha: 0.5,
                bgFill: mod.UIBgFill.OutlineThin
              }
            ]
          },
          {
            name: "Container_MainBody_MercScores",
            type: "Container",
            position: [470, 250],
            size: [940, 790],
            anchor: mod.UIAnchor.TopCenter,
            visible: true,
            padding: 0,
            bgColor: [0.2, 0.2, 0.2],
            bgAlpha: 0.3,
            bgFill: mod.UIBgFill.GradientTop,
            children: [
              {
                name: "Container_MainBody_MercScore_Outline",
                type: "Container",
                position: [0, 0],
                size: [940, 790],
                anchor: mod.UIAnchor.TopLeft,
                visible: true,
                padding: 0,
                bgColor: [1, 1, 1],
                bgAlpha: 0.5,
                bgFill: mod.UIBgFill.OutlineThin
              }
            ]
          }
        ]
      }
    ]
  }
);



