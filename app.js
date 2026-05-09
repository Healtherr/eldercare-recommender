const axes = {
  "horizon": "退休期限",
  "contribution": "储备能力",
  "risk": "风险承受",
  "stability": "收入稳定",
  "liquidity": "流动性需求",
  "protection": "保障缺口",
  "pensionGap": "养老金缺口",
  "discipline": "执行纪律",
  "legacy": "家庭传承"
};

const axisColors = {
  "horizon": "#0f766e",
  "contribution": "#315bdc",
  "risk": "#cf5d3f",
  "stability": "#b97813",
  "liquidity": "#6b5fbb",
  "protection": "#4f7f45",
  "pensionGap": "#097a9f",
  "discipline": "#8a4f9f",
  "legacy": "#a6602a"
};

const categoryNames = {
  "savings": "储蓄",
  "wealth": "理财",
  "fund": "基金",
  "insurance": "保险"
};

const categoryGuides = {
  "savings": {
    "position": "现金垫与确定性底仓",
    "bestFor": "应急金不足、临近退休、收入波动或不接受本金波动的人群。",
    "checkpoints": [
      "是否与日常消费账户分离",
      "提前支取是否影响收益",
      "是否覆盖 6-12 个月家庭开支"
    ],
    "role": "负责稳定性、流动性和执行纪律，不负责主要长期收益。"
  },
  "wealth": {
    "position": "中短期稳健增值层",
    "bestFor": "有一定储备、能接受轻微净值波动、希望比储蓄更有收益弹性的人群。",
    "checkpoints": [
      "产品是否净值型",
      "封闭期与用钱时间是否匹配",
      "底层资产是否过度集中"
    ],
    "role": "负责连接现金层和长期增长层，承接 1-3 年不用的养老资金。"
  },
  "fund": {
    "position": "长期增长与缺口修复层",
    "bestFor": "距离退休较远、愿意定投、能接受阶段性回撤的人群。",
    "checkpoints": [
      "目标日期是否匹配退休年份",
      "权益占比是否超过承受范围",
      "是否具备 5 年以上持有期"
    ],
    "role": "负责复利增长和对抗养老金缺口，需要用纪律和再平衡降低行为风险。"
  },
  "insurance": {
    "position": "风险防线与退休现金流层",
    "bestFor": "家庭责任较重、保障缺口明显、希望锁定未来现金流或传承安排的人群。",
    "checkpoints": [
      "健康告知是否真实完整",
      "退保成本和领取规则是否清晰",
      "保障责任是否覆盖核心风险"
    ],
    "role": "负责防止健康、失能、身故和长寿风险击穿养老账户。"
  }
};

const questions = [
  {
    "id": "age",
    "section": "基础画像",
    "title": "你的当前年龄段",
    "hint": "年龄决定养老资金可积累年限，也会影响储蓄、基金和保险的配置顺序。",
    "options": [
      {
        "label": "35-40 岁",
        "detail": "距离退休较远，可用长期定投和复利积累提高养老资金弹性。",
        "weights": {
          "horizon": 42,
          "risk": 24,
          "discipline": 16,
          "pensionGap": 16
        },
        "preference": "fund"
      },
      {
        "label": "41-45 岁",
        "detail": "仍有较长准备期，适合兼顾增长和保障补强。",
        "weights": {
          "horizon": 34,
          "risk": 20,
          "contribution": 18,
          "protection": 12,
          "pensionGap": 18
        },
        "preference": "fund"
      },
      {
        "label": "46-50 岁",
        "detail": "进入养老规划加速期，需要稳定储备和风险控制并重。",
        "weights": {
          "horizon": 24,
          "contribution": 24,
          "stability": 20,
          "protection": 16,
          "pensionGap": 22
        },
        "preference": "wealth"
      },
      {
        "label": "51-55 岁",
        "detail": "应提高确定性资产占比，逐步锁定退休现金流。",
        "weights": {
          "horizon": 14,
          "stability": 32,
          "liquidity": 18,
          "protection": 20,
          "pensionGap": 30
        },
        "preference": "wealth"
      },
      {
        "label": "56-60 岁",
        "detail": "临近退休，重点是保本、现金流安排和保障缺口检查。",
        "weights": {
          "horizon": 8,
          "stability": 40,
          "liquidity": 30,
          "protection": 24,
          "pensionGap": 34
        },
        "preference": "savings"
      }
    ]
  },
  {
    "id": "retireTiming",
    "section": "退休目标",
    "title": "你预计什么时候退休或半退休",
    "hint": "退休时间越近，组合越需要降低波动；时间越长，越能承受阶段性净值波动。",
    "options": [
      {
        "label": "20 年以后",
        "detail": "适合长期账户与定投纪律，更多利用时间换空间。",
        "weights": {
          "horizon": 44,
          "risk": 22,
          "discipline": 18
        },
        "preference": "fund"
      },
      {
        "label": "10-20 年",
        "detail": "适合增长和稳健配置并行，定期再平衡。",
        "weights": {
          "horizon": 34,
          "risk": 16,
          "contribution": 18,
          "stability": 12
        },
        "preference": "fund"
      },
      {
        "label": "5-10 年",
        "detail": "适合稳健理财、储蓄和年金现金流逐步加码。",
        "weights": {
          "horizon": 18,
          "stability": 30,
          "liquidity": 18,
          "protection": 14
        },
        "preference": "wealth"
      },
      {
        "label": "5 年以内",
        "detail": "优先确保本金安全、领取节奏和应急资金。",
        "weights": {
          "horizon": 8,
          "stability": 42,
          "liquidity": 34,
          "protection": 18
        },
        "preference": "savings"
      }
    ]
  },
  {
    "id": "retirementLifestyle",
    "section": "退休目标",
    "title": "你希望退休后的生活标准",
    "hint": "目标生活标准决定养老金缺口大小，越高的目标越需要长期收益和现金流规划。",
    "options": [
      {
        "label": "基础生活即可",
        "detail": "优先保证稳定现金流和医疗保障。",
        "weights": {
          "stability": 32,
          "liquidity": 18,
          "protection": 16,
          "pensionGap": 12
        },
        "preference": "savings"
      },
      {
        "label": "维持当前水平",
        "detail": "需要储蓄、理财和基金共同形成补充养老金。",
        "weights": {
          "pensionGap": 30,
          "contribution": 22,
          "stability": 18,
          "discipline": 12
        },
        "preference": "wealth"
      },
      {
        "label": "希望旅行和兴趣预算",
        "detail": "弹性消费会放大缺口，需要长期增长资产参与。",
        "weights": {
          "pensionGap": 42,
          "risk": 24,
          "horizon": 16,
          "contribution": 14
        },
        "preference": "fund"
      },
      {
        "label": "希望兼顾家人支持",
        "detail": "需要现金流、保障和家庭传承类安排配合。",
        "weights": {
          "legacy": 38,
          "protection": 30,
          "stability": 18,
          "pensionGap": 20
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "currentReserve",
    "section": "资产基础",
    "title": "你已经为养老准备了多少专项资金",
    "hint": "已有储备越少，越需要提高月度投入和基础保障；已有储备越多，越需要结构优化。",
    "options": [
      {
        "label": "几乎没有专项储备",
        "detail": "需要先建立养老账户和自动投入机制。",
        "weights": {
          "pensionGap": 44,
          "contribution": 12,
          "liquidity": 20,
          "protection": 18
        },
        "preference": "savings"
      },
      {
        "label": "10 万元以内",
        "detail": "可从储蓄垫和低门槛定投开始。",
        "weights": {
          "pensionGap": 36,
          "contribution": 18,
          "liquidity": 16,
          "discipline": 14
        },
        "preference": "savings"
      },
      {
        "label": "10-50 万元",
        "detail": "适合做四类产品分层配置，提升收益与保障效率。",
        "weights": {
          "pensionGap": 24,
          "contribution": 24,
          "risk": 12,
          "stability": 14
        },
        "preference": "wealth"
      },
      {
        "label": "50-150 万元",
        "detail": "重点从产品堆叠转为目标配置和领取规划。",
        "weights": {
          "contribution": 34,
          "stability": 20,
          "risk": 16,
          "legacy": 12
        },
        "preference": "wealth"
      },
      {
        "label": "150 万元以上",
        "detail": "适合做长期现金流、保险权益和多账户管理。",
        "weights": {
          "contribution": 42,
          "stability": 26,
          "legacy": 24,
          "protection": 14
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "monthlySaving",
    "section": "资产基础",
    "title": "每月可用于养老规划的新增投入",
    "hint": "新增投入能力决定组合颗粒度、产品门槛和调整频率。",
    "options": [
      {
        "label": "500 元以内",
        "detail": "优先低门槛储蓄、基金定投和基础保障。",
        "weights": {
          "contribution": 12,
          "pensionGap": 34,
          "liquidity": 20
        },
        "capacityLevel": 1,
        "monthlyRange": "100-500 元/月"
      },
      {
        "label": "500-2000 元",
        "detail": "可建立稳定月投，并配置少量保险保障。",
        "weights": {
          "contribution": 24,
          "pensionGap": 24,
          "stability": 12,
          "discipline": 14
        },
        "capacityLevel": 2,
        "monthlyRange": "500-2000 元/月"
      },
      {
        "label": "2000-5000 元",
        "detail": "可同时覆盖定投、稳健理财和保障补强。",
        "weights": {
          "contribution": 36,
          "risk": 12,
          "stability": 16,
          "protection": 12
        },
        "capacityLevel": 3,
        "monthlyRange": "2000-5000 元/月"
      },
      {
        "label": "5000 元以上",
        "detail": "适合做多账户组合、年金现金流和长期权益资产。",
        "weights": {
          "contribution": 48,
          "risk": 18,
          "stability": 18,
          "legacy": 18
        },
        "capacityLevel": 4,
        "monthlyRange": "5000 元以上/月"
      }
    ]
  },
  {
    "id": "incomeStability",
    "section": "现金流",
    "title": "你的未来 3 年收入稳定性",
    "hint": "收入波动越大，越要提高流动性和保障；收入稳定则可增加长期配置。",
    "options": [
      {
        "label": "非常稳定",
        "detail": "工资或经营收入可预期，适合自动扣款和长期计划。",
        "weights": {
          "stability": 40,
          "contribution": 24,
          "discipline": 16
        }
      },
      {
        "label": "基本稳定",
        "detail": "偶有波动但不影响家庭现金流。",
        "weights": {
          "stability": 30,
          "contribution": 18,
          "liquidity": 12
        }
      },
      {
        "label": "波动较大",
        "detail": "奖金、项目或经营收入占比较高，需要现金垫。",
        "weights": {
          "liquidity": 36,
          "protection": 18,
          "pensionGap": 16,
          "stability": 10
        },
        "preference": "savings"
      },
      {
        "label": "不太稳定",
        "detail": "职业或经营存在不确定性，先守住应急和保障底线。",
        "weights": {
          "liquidity": 46,
          "protection": 30,
          "pensionGap": 22,
          "stability": 8
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "emergencyFund",
    "section": "现金流",
    "title": "你的家庭应急金能覆盖多久开支",
    "hint": "应急金不足时，不宜把养老资金过多锁定在长期产品里。",
    "options": [
      {
        "label": "不足 3 个月",
        "detail": "先补流动性，再做长期养老配置。",
        "weights": {
          "liquidity": 48,
          "pensionGap": 20,
          "protection": 16
        },
        "preference": "savings"
      },
      {
        "label": "3-6 个月",
        "detail": "具备基础缓冲，可开始小额定投和稳健理财。",
        "weights": {
          "liquidity": 30,
          "stability": 14,
          "contribution": 12
        },
        "preference": "savings"
      },
      {
        "label": "6-12 个月",
        "detail": "现金垫较充足，可扩大长期投入比例。",
        "weights": {
          "stability": 28,
          "contribution": 22,
          "risk": 12
        },
        "preference": "wealth"
      },
      {
        "label": "12 个月以上",
        "detail": "流动性较安全，可提高基金或年金类长期配置。",
        "weights": {
          "stability": 34,
          "contribution": 26,
          "risk": 18
        },
        "preference": "fund"
      }
    ]
  },
  {
    "id": "debtPressure",
    "section": "现金流",
    "title": "你的家庭债务压力",
    "hint": "房贷、经营贷和消费贷会影响养老资金的稳定投入和保险保额需求。",
    "options": [
      {
        "label": "几乎没有债务",
        "detail": "现金流弹性较高，可提高长期配置比例。",
        "weights": {
          "contribution": 24,
          "risk": 14,
          "stability": 18
        },
        "preference": "fund"
      },
      {
        "label": "有房贷但压力可控",
        "detail": "需要维持稳定月投，同时留好应急金。",
        "weights": {
          "liquidity": 22,
          "discipline": 16,
          "protection": 12
        },
        "preference": "wealth"
      },
      {
        "label": "债务占收入较高",
        "detail": "优先压低产品承诺成本，补足风险防线。",
        "weights": {
          "liquidity": 38,
          "protection": 28,
          "pensionGap": 18
        },
        "preference": "savings"
      },
      {
        "label": "经营或消费贷压力大",
        "detail": "先处理高成本债务，再做养老增配。",
        "weights": {
          "liquidity": 48,
          "protection": 26,
          "pensionGap": 24,
          "discipline": 12
        },
        "preference": "savings"
      }
    ]
  },
  {
    "id": "familyBurden",
    "section": "家庭责任",
    "title": "当前家庭责任和支出压力",
    "hint": "子女教育、房贷、赡养父母等责任会影响养老资金的可持续投入。",
    "options": [
      {
        "label": "压力较轻",
        "detail": "家庭支出可控，可更早建立长期账户。",
        "weights": {
          "contribution": 26,
          "risk": 16,
          "horizon": 12
        }
      },
      {
        "label": "有固定房贷或教育支出",
        "detail": "需要平衡长期投入和短期现金流。",
        "weights": {
          "liquidity": 26,
          "pensionGap": 18,
          "stability": 14
        }
      },
      {
        "label": "上有老下有小",
        "detail": "保障缺口和现金流韧性要先补齐。",
        "weights": {
          "protection": 40,
          "liquidity": 28,
          "pensionGap": 22,
          "legacy": 10
        },
        "preference": "insurance"
      },
      {
        "label": "支出压力很高",
        "detail": "先做低成本基础组合，避免高承诺产品造成负担。",
        "weights": {
          "liquidity": 44,
          "pensionGap": 30,
          "protection": 28
        },
        "preference": "savings"
      }
    ]
  },
  {
    "id": "parentsCare",
    "section": "家庭责任",
    "title": "你对父母养老或医疗支出的承担程度",
    "hint": "上一代支出责任会影响你自己的养老储备节奏，也会提高流动性需求。",
    "options": [
      {
        "label": "基本不需要承担",
        "detail": "可把更多精力放在自己的长期账户。",
        "weights": {
          "contribution": 18,
          "risk": 12,
          "discipline": 10
        }
      },
      {
        "label": "偶尔支持",
        "detail": "建议留出家庭互助资金，避免打断长期定投。",
        "weights": {
          "liquidity": 22,
          "protection": 12,
          "stability": 12
        }
      },
      {
        "label": "每月固定支持",
        "detail": "需要把赡养支出纳入现金流表。",
        "weights": {
          "liquidity": 34,
          "protection": 22,
          "pensionGap": 18
        }
      },
      {
        "label": "可能承担大额医疗支出",
        "detail": "要优先建立现金垫和家庭保障边界。",
        "weights": {
          "liquidity": 48,
          "protection": 34,
          "pensionGap": 22
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "childrenPlan",
    "section": "家庭责任",
    "title": "未来 10 年子女教育或家庭大额支出",
    "hint": "教育金、换房和创业资金会改变养老资产的可锁定期限。",
    "options": [
      {
        "label": "没有明显大额支出",
        "detail": "养老资金可采用更长期的产品结构。",
        "weights": {
          "horizon": 22,
          "risk": 16,
          "discipline": 14
        },
        "preference": "fund"
      },
      {
        "label": "有教育支出但可规划",
        "detail": "可分出教育账户和养老账户，避免混用。",
        "weights": {
          "liquidity": 24,
          "discipline": 18,
          "stability": 12
        }
      },
      {
        "label": "可能换房或创业",
        "detail": "要降低长期锁定类产品比例。",
        "weights": {
          "liquidity": 42,
          "stability": 18,
          "pensionGap": 16
        },
        "preference": "savings"
      },
      {
        "label": "大额支出不确定",
        "detail": "优先保留现金垫和短周期产品。",
        "weights": {
          "liquidity": 46,
          "protection": 16,
          "discipline": 12
        },
        "preference": "savings"
      }
    ]
  },
  {
    "id": "riskTolerance",
    "section": "风险偏好",
    "title": "面对养老资金短期亏损，你的接受程度",
    "hint": "养老资金不是越保守越好，也不是越激进越好，关键是和期限匹配。",
    "options": [
      {
        "label": "不能接受亏损",
        "detail": "优先储蓄、低风险理财和确定性现金流。",
        "weights": {
          "stability": 44,
          "liquidity": 24,
          "risk": 4
        },
        "preference": "savings"
      },
      {
        "label": "可接受 5% 以内波动",
        "detail": "适合稳健理财与少量低波动基金。",
        "weights": {
          "stability": 34,
          "risk": 18,
          "liquidity": 14
        },
        "preference": "wealth"
      },
      {
        "label": "可接受 5%-15% 波动",
        "detail": "适合均衡组合，用基金定投提升长期收益。",
        "weights": {
          "risk": 36,
          "horizon": 16,
          "contribution": 16
        },
        "preference": "fund"
      },
      {
        "label": "可接受更高波动",
        "detail": "适合长期权益资产，但仍要保留储蓄和保险底仓。",
        "weights": {
          "risk": 50,
          "horizon": 22,
          "contribution": 18
        },
        "preference": "fund"
      }
    ]
  },
  {
    "id": "drawdownReaction",
    "section": "风险偏好",
    "title": "如果基金账户下跌 10%，你通常会怎么做",
    "hint": "行为反应比口头风险偏好更重要，它决定定投是否能坚持。",
    "options": [
      {
        "label": "马上赎回",
        "detail": "更适合低波动产品，不宜配置高比例权益基金。",
        "weights": {
          "stability": 42,
          "liquidity": 24,
          "risk": 4
        },
        "preference": "savings"
      },
      {
        "label": "暂停观察",
        "detail": "需要降低波动并设置再评估规则。",
        "weights": {
          "stability": 28,
          "discipline": 12,
          "risk": 14
        },
        "preference": "wealth"
      },
      {
        "label": "继续定投",
        "detail": "具备养老长期投资纪律，可配置目标日期或指数定投。",
        "weights": {
          "discipline": 36,
          "risk": 30,
          "horizon": 18
        },
        "preference": "fund"
      },
      {
        "label": "分批加仓",
        "detail": "风险承受和执行纪律较强，但仍需控制单一资产占比。",
        "weights": {
          "risk": 46,
          "discipline": 34,
          "horizon": 20
        },
        "preference": "fund"
      }
    ]
  },
  {
    "id": "investmentExperience",
    "section": "风险偏好",
    "title": "你过往的投资经验",
    "hint": "经验会影响产品复杂度和是否适合主动调仓。",
    "options": [
      {
        "label": "只用过存款",
        "detail": "需要低波动、低复杂度产品先建立信任。",
        "weights": {
          "stability": 36,
          "liquidity": 20,
          "risk": 8
        },
        "preference": "savings"
      },
      {
        "label": "买过银行理财",
        "detail": "可从固收+、现金管理和低波动组合过渡。",
        "weights": {
          "stability": 30,
          "risk": 16,
          "contribution": 12
        },
        "preference": "wealth"
      },
      {
        "label": "有基金定投经验",
        "detail": "适合目标日期或目标风险基金承接养老目标。",
        "weights": {
          "risk": 36,
          "horizon": 18,
          "discipline": 20
        },
        "preference": "fund"
      },
      {
        "label": "熟悉多类资产",
        "detail": "可做更细的账户分层和再平衡策略。",
        "weights": {
          "risk": 42,
          "contribution": 24,
          "discipline": 18
        },
        "preference": "fund"
      }
    ]
  },
  {
    "id": "managementStyle",
    "section": "执行偏好",
    "title": "你更偏好的产品管理方式",
    "hint": "管理方式会影响推荐产品的复杂度和后续维护成本。",
    "options": [
      {
        "label": "越省心越好",
        "detail": "偏向储蓄、年金和低维护的稳健产品。",
        "weights": {
          "stability": 36,
          "liquidity": 18,
          "discipline": 10
        },
        "preference": "savings"
      },
      {
        "label": "每季度看一次",
        "detail": "适合稳健理财和目标风险基金组合。",
        "weights": {
          "stability": 26,
          "risk": 16,
          "discipline": 18
        },
        "preference": "wealth"
      },
      {
        "label": "愿意长期定投",
        "detail": "适合基金定投和目标日期策略。",
        "weights": {
          "horizon": 28,
          "risk": 28,
          "discipline": 30
        },
        "preference": "fund"
      },
      {
        "label": "想先补保障",
        "detail": "适合先做保险体检和养老年金规划。",
        "weights": {
          "protection": 44,
          "pensionGap": 18,
          "legacy": 12
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "reviewFrequency",
    "section": "执行偏好",
    "title": "你愿意多久复盘一次养老配置",
    "hint": "复盘频率越低，越需要自动化和低维护产品；频率越高，可承接更细的再平衡策略。",
    "options": [
      {
        "label": "基本不想复盘",
        "detail": "更适合目标日期基金、年金和自动划转。",
        "weights": {
          "discipline": 12,
          "stability": 26,
          "protection": 12
        },
        "preference": "insurance"
      },
      {
        "label": "每年一次",
        "detail": "适合大部分稳健组合，年度再平衡即可。",
        "weights": {
          "discipline": 22,
          "stability": 18,
          "contribution": 12
        },
        "preference": "wealth"
      },
      {
        "label": "每季度一次",
        "detail": "可以做更细的配置跟踪和产品替换。",
        "weights": {
          "discipline": 34,
          "risk": 14,
          "contribution": 14
        },
        "preference": "fund"
      },
      {
        "label": "每月都看",
        "detail": "需要防止过度交易，把规则写在前面。",
        "weights": {
          "discipline": 30,
          "risk": 22,
          "liquidity": 12
        },
        "preference": "fund"
      }
    ]
  },
  {
    "id": "insuranceStatus",
    "section": "保障底座",
    "title": "你目前的商业保险保障",
    "hint": "养老规划不能只看收益，健康、身故和长期现金流风险也要覆盖。",
    "options": [
      {
        "label": "保障较完整",
        "detail": "已有医疗、重疾、寿险或养老年金。",
        "weights": {
          "protection": 10,
          "stability": 16,
          "contribution": 12
        }
      },
      {
        "label": "只有基础医疗险",
        "detail": "建议补齐大病、家庭责任和未来养老现金流。",
        "weights": {
          "protection": 36,
          "pensionGap": 16
        },
        "preference": "insurance"
      },
      {
        "label": "保障不清楚",
        "detail": "需要先做保单体检，再决定保险类产品占比。",
        "weights": {
          "protection": 44,
          "liquidity": 16,
          "pensionGap": 18
        },
        "preference": "insurance"
      },
      {
        "label": "几乎没有商业保险",
        "detail": "应优先补保障缺口，避免风险打断养老储备。",
        "weights": {
          "protection": 54,
          "liquidity": 20,
          "pensionGap": 24
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "healthExpectation",
    "section": "保障底座",
    "title": "你对未来健康和护理支出的担忧程度",
    "hint": "健康和失能支出是养老规划中最容易被低估的风险。",
    "options": [
      {
        "label": "基本不担心",
        "detail": "仍需保留基础医疗和应急金。",
        "weights": {
          "stability": 18,
          "liquidity": 10,
          "protection": 8
        }
      },
      {
        "label": "有一些担心",
        "detail": "适合检查医疗险、重疾险和长期护理责任。",
        "weights": {
          "protection": 28,
          "liquidity": 14,
          "pensionGap": 12
        },
        "preference": "insurance"
      },
      {
        "label": "家族有慢病史",
        "detail": "保障体检优先级较高，避免未来买不了。",
        "weights": {
          "protection": 44,
          "liquidity": 18,
          "pensionGap": 18
        },
        "preference": "insurance"
      },
      {
        "label": "非常担心高龄护理",
        "detail": "需重点纳入护理保障和未来现金流预案。",
        "weights": {
          "protection": 54,
          "pensionGap": 26,
          "stability": 16
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "pensionSource",
    "section": "退休收入",
    "title": "你预计退休后的主要收入来源",
    "hint": "退休收入来源越单一，越需要提前建立第二、第三支柱。",
    "options": [
      {
        "label": "社保养老金为主",
        "detail": "需要额外补充个人养老金和商业养老现金流。",
        "weights": {
          "pensionGap": 44,
          "protection": 22,
          "contribution": 14
        },
        "preference": "insurance"
      },
      {
        "label": "社保 + 存款",
        "detail": "应提高长期收益资产和现金流产品的搭配。",
        "weights": {
          "pensionGap": 32,
          "stability": 22,
          "liquidity": 14
        },
        "preference": "wealth"
      },
      {
        "label": "社保 + 投资收益",
        "detail": "需要控制波动并建立退休前后的再平衡规则。",
        "weights": {
          "risk": 24,
          "stability": 20,
          "horizon": 14
        },
        "preference": "fund"
      },
      {
        "label": "已有多元安排",
        "detail": "适合做账户整合、税优和领取节奏优化。",
        "weights": {
          "contribution": 32,
          "stability": 24,
          "legacy": 14
        },
        "preference": "wealth"
      }
    ]
  },
  {
    "id": "individualPension",
    "section": "退休收入",
    "title": "你是否已经开通个人养老金账户",
    "hint": "个人养老金账户会影响税优、产品范围和领取限制，需要单独规划。",
    "options": [
      {
        "label": "已开通并持续投入",
        "detail": "可进一步优化账户内产品结构。",
        "weights": {
          "discipline": 34,
          "contribution": 20,
          "stability": 12
        },
        "preference": "fund"
      },
      {
        "label": "已开通但没怎么用",
        "detail": "适合建立账户内现金层和定投规则。",
        "weights": {
          "discipline": 22,
          "pensionGap": 20,
          "stability": 16
        },
        "preference": "wealth"
      },
      {
        "label": "还没开通",
        "detail": "可作为 30 天行动清单的一项基础动作。",
        "weights": {
          "pensionGap": 26,
          "discipline": 14,
          "contribution": 12
        },
        "preference": "savings"
      },
      {
        "label": "不了解规则",
        "detail": "需要先理解税优、封闭和领取条件。",
        "weights": {
          "pensionGap": 30,
          "liquidity": 18,
          "stability": 12
        },
        "preference": "savings"
      }
    ]
  },
  {
    "id": "taxSensitivity",
    "section": "退休收入",
    "title": "你对税优和账户规则的关注程度",
    "hint": "高收入人群可能更关注个人养老金税优，但也要理解领取时点和封闭性。",
    "options": [
      {
        "label": "暂时不关注",
        "detail": "先把账户和配置框架搭起来。",
        "weights": {
          "discipline": 12,
          "liquidity": 12,
          "pensionGap": 10
        }
      },
      {
        "label": "愿意了解但怕复杂",
        "detail": "适合使用规则清晰的账户产品。",
        "weights": {
          "discipline": 20,
          "stability": 18,
          "pensionGap": 14
        },
        "preference": "wealth"
      },
      {
        "label": "希望充分利用税优",
        "detail": "可把个人养老金账户作为独立子组合。",
        "weights": {
          "contribution": 28,
          "discipline": 22,
          "stability": 14
        },
        "preference": "fund"
      },
      {
        "label": "需要兼顾传承和税务",
        "detail": "适合纳入保险、账户和家庭资产安排。",
        "weights": {
          "legacy": 42,
          "protection": 24,
          "contribution": 16
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "legacyGoal",
    "section": "家庭传承",
    "title": "你是否希望为家人保留资产或安排传承",
    "hint": "传承目标会提高保险、长期现金价值和低波动资产的权重。",
    "options": [
      {
        "label": "没有明显传承目标",
        "detail": "重点放在自己的退休收入和健康风险。",
        "weights": {
          "pensionGap": 16,
          "stability": 14,
          "liquidity": 10
        }
      },
      {
        "label": "希望不给家人添负担",
        "detail": "需补充健康、寿险和护理风险。",
        "weights": {
          "protection": 34,
          "legacy": 18,
          "stability": 12
        },
        "preference": "insurance"
      },
      {
        "label": "希望留下一部分资产",
        "detail": "可纳入增额寿、年金和稳健资产配置。",
        "weights": {
          "legacy": 42,
          "protection": 22,
          "stability": 16
        },
        "preference": "insurance"
      },
      {
        "label": "有明确传承安排",
        "detail": "需要关注保单架构、受益人和家庭沟通。",
        "weights": {
          "legacy": 56,
          "protection": 26,
          "stability": 18
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "housingAsset",
    "section": "家庭传承",
    "title": "房产在你家庭资产中的占比",
    "hint": "房产占比过高会造成流动性不足，需要现金流和金融资产补位。",
    "options": [
      {
        "label": "没有房产或占比很低",
        "detail": "养老规划更依赖金融资产积累。",
        "weights": {
          "pensionGap": 30,
          "contribution": 18,
          "liquidity": 14
        },
        "preference": "fund"
      },
      {
        "label": "占比适中",
        "detail": "可按标准四类组合推进。",
        "weights": {
          "stability": 18,
          "contribution": 16,
          "discipline": 12
        },
        "preference": "wealth"
      },
      {
        "label": "大部分资产在房产",
        "detail": "需要提高金融资产流动性和现金流比例。",
        "weights": {
          "liquidity": 38,
          "pensionGap": 22,
          "stability": 18
        },
        "preference": "savings"
      },
      {
        "label": "未来考虑以房养老或置换",
        "detail": "需要把房产变现节奏纳入退休收入计划。",
        "weights": {
          "liquidity": 34,
          "legacy": 24,
          "stability": 18
        },
        "preference": "wealth"
      }
    ]
  },
  {
    "id": "productPreference",
    "section": "产品偏好",
    "title": "你当前最想优先了解哪类产品",
    "hint": "偏好会作为入口，但系统仍会根据风险、期限和缺口进行纠偏。",
    "options": [
      {
        "label": "储蓄类，先稳住本金",
        "detail": "适合从现金垫和专项账户开始。",
        "weights": {
          "stability": 30,
          "liquidity": 26,
          "risk": 6
        },
        "preference": "savings"
      },
      {
        "label": "理财类，追求稳健增值",
        "detail": "适合固收、现金管理和多资产稳健组合。",
        "weights": {
          "stability": 28,
          "contribution": 16,
          "risk": 14
        },
        "preference": "wealth"
      },
      {
        "label": "基金类，长期定投增长",
        "detail": "适合目标日期、目标风险和指数定投。",
        "weights": {
          "risk": 34,
          "horizon": 24,
          "discipline": 22
        },
        "preference": "fund"
      },
      {
        "label": "保险类，锁定保障和现金流",
        "detail": "适合保单体检、年金和长期护理规划。",
        "weights": {
          "protection": 38,
          "legacy": 20,
          "stability": 16
        },
        "preference": "insurance"
      }
    ]
  },
  {
    "id": "purchaseBarrier",
    "section": "产品偏好",
    "title": "你迟迟没有开始养老规划的主要原因",
    "hint": "阻碍点决定推荐方案的第一步，很多时候先解决行为和信息问题比选产品更重要。",
    "options": [
      {
        "label": "不知道买什么",
        "detail": "需要产品库解释和四类组合框架。",
        "weights": {
          "discipline": 20,
          "pensionGap": 18,
          "stability": 12
        },
        "preference": "wealth"
      },
      {
        "label": "担心亏损",
        "detail": "需要低波动底仓和小额试投。",
        "weights": {
          "stability": 36,
          "liquidity": 20,
          "risk": 6
        },
        "preference": "savings"
      },
      {
        "label": "觉得还太早",
        "detail": "需要用缺口测算和复利模拟提高紧迫感。",
        "weights": {
          "horizon": 28,
          "pensionGap": 30,
          "discipline": 16
        },
        "preference": "fund"
      },
      {
        "label": "现金流不够",
        "detail": "需要从小额自动划转和保障体检开始。",
        "weights": {
          "liquidity": 36,
          "pensionGap": 28,
          "protection": 18
        },
        "preference": "savings"
      }
    ]
  },
  {
    "id": "adviceNeed",
    "section": "服务偏好",
    "title": "你希望系统给到什么程度的建议",
    "hint": "建议深度会影响结果页呈现：只看比例、看产品、看执行清单，还是看长期复盘。",
    "options": [
      {
        "label": "只想看大类比例",
        "detail": "推荐会更强调四类产品配置。",
        "weights": {
          "discipline": 10,
          "stability": 18,
          "liquidity": 10
        }
      },
      {
        "label": "想知道具体产品类型",
        "detail": "推荐会展示更细的产品货架。",
        "weights": {
          "discipline": 18,
          "contribution": 14,
          "pensionGap": 12
        }
      },
      {
        "label": "想要执行步骤",
        "detail": "推荐会突出 30 天行动计划和账户分层。",
        "weights": {
          "discipline": 34,
          "liquidity": 12,
          "protection": 12
        }
      },
      {
        "label": "想长期跟踪复盘",
        "detail": "推荐会强调年度复盘和再平衡规则。",
        "weights": {
          "discipline": 46,
          "risk": 18,
          "contribution": 16
        },
        "preference": "fund"
      }
    ]
  }
];

const productCatalog = [
    {
    "id": "savings-01-招行养老专户",
    "name": "招商银行「朝朝宝」养老专户",
    "category": "savings",
    "shortType": "招",
    "price": "10%-25%",
    "riskTier": "低风险",
    "level": 1,
    "term": "随用随取",
    "threshold": "1 元起",
    "liquidity": "高",
    "stage": "起步层",
    "account": "现金与储蓄账户",
    "role": "发薪后自动归集至专项养老子账户，提供 T+0 赎回和高于活期的收益，与日常消费账户隔离。",
    "suitable": "适合刚开始养老规划、希望建立强制储蓄习惯的工薪族。",
    "caution": "单日快速赎回有额度限制（当前约 1 万元/日），大额需提前一日操作。",
    "summary": "招商银行「朝朝宝」依托货币市场底层，7 日年化收益通常高于活期，支持发薪日自动归集到「养老专户」标签，与消费账户物理隔离，是建立养老现金垫的最低门槛入口。",
    "tags": ["朝朝宝", "T+0", "自动归集"],
    "feeFocus": "无申购赎回费；关注7日年化与万份收益波动，与余额宝横向比较。",
    "selectionTips": "在招行 App「财富」→「养老」专区开设专属子账户，设置发薪当日定时转入。",
    "rebalance": "每月确认自动划转执行，每半年看现金垫月数是否达到 6-12 个月家庭支出。",
    "weights": {
      "liquidity": 0.3,
      "stability": 0.26,
      "pensionGap": 0.16,
      "contribution": 0.12,
      "discipline": 0.1,
      "protection": 0.06
    }
  },
  {
    "id": "savings-02-国有行阶梯存单",
    "name": "工商银行「整存整取」阶梯存单组合",
    "category": "savings",
    "shortType": "阶",
    "price": "10%-30%",
    "riskTier": "低风险",
    "level": 1,
    "term": "3 个月-3 年分层",
    "threshold": "50 元起/笔",
    "liquidity": "中",
    "stage": "起步层",
    "account": "现金与储蓄账户",
    "role": "将养老储备分为 3 档定期（3 月、1 年、3 年），到期后依次滚动，模拟周期性现金流。",
    "suitable": "适合临近退休、偏好银行存款确定性、希望每季度或每年都有资金到期的人群。",
    "caution": "提前支取按活期计息；建议同时保留一笔活期垫，避免临时支取影响存单利息。",
    "summary": "工行整存整取利率在国有行中具有参考性，通过「3 月→1 年→3 年」阶梯化布局，让不同期限资金依次到期，形成固定现金流节奏，同时利用越长期限利率越高的利差。",
    "tags": ["整存整取", "期限分层", "国有行"],
    "feeFocus": "无手续费；重点关注最新挂牌利率（建议每季度登录工行 App 比价）。",
    "selectionTips": "新建存单时在备注写明「养老-3月/1年/3年」，方便年度复盘时识别。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "stability": 0.32,
      "liquidity": 0.24,
      "pensionGap": 0.14,
      "discipline": 0.12,
      "contribution": 0.1,
      "protection": 0.08
    }
  },
  {
    "id": "savings-03-余额宝现金管理垫",
    "name": "支付宝「余额宝」/ 天弘基金货币 A（000198）",
    "category": "savings",
    "shortType": "宝",
    "price": "5%-20%",
    "riskTier": "低风险",
    "level": 1,
    "term": "随用随取",
    "threshold": "1 分钱起",
    "liquidity": "高",
    "stage": "起步层",
    "account": "现金与储蓄账户",
    "role": "作为组合安全阀，承接月底余量及突发支出备用金，避免市场下跌时被迫赎回长期产品。",
    "suitable": "适合收入波动、家庭责任较重或应急金不足的人群，流动性需求最优先者。",
    "caution": "7 日年化约 1.5%-2%，长期跑输通胀；不宜替代长期养老增值产品，仅做过渡层。",
    "summary": "余额宝底层天弘货币 A（000198）是国内规模最大的货币基金，T+0 快速赎回上限 1 万元/日，适合存放「3 个月内可能动用」的应急金；配合支付宝「基金定投」功能可每月自动转入。",
    "tags": ["天弘货币A", "000198", "T+0"],
    "feeFocus": "无申购赎回费；与招行朝朝宝、微信零钱通横向比价，选当前收益更高者。",
    "selectionTips": "先确认资金用途和可锁定期限，再决定活期、通知、定期或阶梯结构。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "liquidity": 0.4,
      "stability": 0.2,
      "protection": 0.12,
      "pensionGap": 0.12,
      "contribution": 0.1,
      "risk": 0.06
    }
  },
  {
    "id": "savings-04-工资自动划转",
    "name": "建设银行「龙宝」工资自动划转计划",
    "category": "savings",
    "shortType": "转",
    "price": "5%-15%",
    "riskTier": "低风险",
    "level": 1,
    "term": "每月持续",
    "threshold": "100 元/月起",
    "liquidity": "高",
    "stage": "起步层",
    "account": "现金与储蓄账户",
    "role": "发薪当日在建行 App 设置定向划转规则，把工资的固定比例自动存入「龙宝养老子账户」。",
    "suitable": "适合有稳定工资、容易拖延储蓄、或希望把储蓄从「意愿」变成「规则」的人群。",
    "caution": "划转金额需与房贷、教育支出和日常现金流统筹规划，避免月中出现临时透支。",
    "summary": "建行龙宝支持「收入自动分配」规则：发薪后 X 元自动转养老账户、Y 元自动还房贷、剩余留日常消费，一次设置、长期自动执行，彻底解决「发了薪水就花完」的行为惰性。",
    "tags": ["发薪自动划转", "强制储蓄", "纪律执行"],
    "feeFocus": "建行跨行转账有限额限制；重点确认与代发工资银行的到账时间差。",
    "selectionTips": "先确认资金用途和可锁定期限，再决定活期、通知、定期或阶梯结构。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "liquidity": 0.3,
      "stability": 0.26,
      "pensionGap": 0.16,
      "contribution": 0.12,
      "discipline": 0.1,
      "protection": 0.06
    }
  },
  {
    "id": "savings-05-个人养老金存款",
    "name": "工商银行「个人养老金专项存款」（5 年期）",
    "category": "savings",
    "shortType": "税",
    "price": "5%-15%",
    "riskTier": "低风险",
    "level": 2,
    "term": "至领取条件（约退休年龄）",
    "threshold": "按账户规则，年缴上限 1.2 万元",
    "liquidity": "低",
    "stage": "核心层",
    "account": "现金与储蓄账户",
    "role": "在个人养老金账户内配置专项存款，享受税前扣除优惠，同时获取高于普通定存的利率。",
    "suitable": "适合已开通个人养老金账户、边际税率 10% 以上、希望在账户内先配置确定性产品的人群。",
    "caution": "资金锁定至退休条件（目前约 60 岁），提前支取不可；需在个人养老金 App 内操作，不可线下随意支取。",
    "summary": "工行个人养老金专项存款利率通常比同期普通存款高 10-30 bp，叠加税优（年缴 1.2 万元可抵税），综合回报优于市场普通存款；是账户内「稳健底仓」的首选工具，适合边际税率较高的工薪族。",
    "tags": ["个人养老金", "专项存款", "税优"],
    "feeFocus": "重点比较提前支取规则、转让规则、利率锁定期和到账时间；各行利率存在差异，建议对比招行、工行、建行、中行。",
    "selectionTips": "先确认资金用途和可锁定期限，再决定活期、通知、定期或阶梯结构。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "stability": 0.32,
      "liquidity": 0.24,
      "pensionGap": 0.14,
      "discipline": 0.12,
      "contribution": 0.1,
      "protection": 0.08
    }
  },
  {
    "id": "savings-06-退休前支出储备",
    "name": "招商银行「招招盈」1-3 年定开理财（现金备用款）",
    "category": "savings",
    "shortType": "备",
    "price": "8%-20%",
    "riskTier": "低风险",
    "level": 2,
    "term": "1-36 个月",
    "threshold": "1 元起",
    "liquidity": "中高",
    "stage": "核心层",
    "account": "现金与储蓄账户",
    "role": "为临近退休阶段建立 1-3 年支出缓冲，确保基金和长期保险不因短期用钱被打断。",
    "suitable": "适合 55 岁以上或 5 年内计划退休、已完成长期配置但需预留过渡资金的人群。",
    "caution": "招招盈为净值型产品，短期净值波动存在；若在封闭期内急需资金，无法提前赎回。",
    "summary": "招商银行「招招盈」系列是面向个人投资者的短周期开放式理财，底层以信用债和货币资产为主，年化收益率通常在 2%-3.5% 区间，每隔 1-3 个月开放一次，适合作为「退休前 3 年支出缓冲」。",
    "tags": ["招招盈", "短周期", "临退备用"],
    "feeFocus": "重点比较到账速度、支取限制、账户分离和自动转入规则。",
    "selectionTips": "先确认资金用途和可锁定期限，再决定活期、通知、定期或阶梯结构。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "liquidity": 0.36,
      "stability": 0.24,
      "pensionGap": 0.14,
      "discipline": 0.12,
      "contribution": 0.08,
      "protection": 0.06
    }
  },
  {
    "id": "savings-07-国债",
    "name": "国家财政部「凭证式国债 / 储蓄国债」（3 年 / 5 年）",
    "category": "savings",
    "shortType": "债",
    "price": "5%-20%",
    "riskTier": "低风险",
    "level": 2,
    "term": "3 年或 5 年",
    "threshold": "100 元起/面额",
    "liquidity": "中（可提前兑取，按持有时间扣息）",
    "stage": "核心层",
    "account": "现金与储蓄账户",
    "role": "以国家信用锁定 3-5 年确定性利率，作为养老储蓄组合的压舱石。",
    "suitable": "适合偏好绝对安全、不能接受任何本金波动、有 3-5 年不用的养老专款的人群。",
    "caution": "凭证式国债每年 3 月和 11 月限期发行，额度有限须及时购买；电子式国债（E 国债）可在银行 App 全年购买，流动性略高。",
    "summary": "储蓄国债由国家财政部发行，安全性最高，3 年期利率约 2.35%、5 年期约 2.50%（具体以每次发行公告为准），高于同期定期存款，且利息收入免个人所得税，是养老储蓄层的高确定性选择。",
    "tags": ["储蓄国债", "国家信用", "免税利息"],
    "feeFocus": "提前兑取按持有时间扣息（180 天内扣 1%，1 年内扣 0.6%，1-2 年扣 0.4%，2 年以上扣 0.2%），注意与到期目标匹配。",
    "selectionTips": "优先通过手机银行或国债服务网点购买电子式国债，避免凭证式排队风险。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "stability": 0.34,
      "liquidity": 0.2,
      "pensionGap": 0.16,
      "discipline": 0.12,
      "contribution": 0.1,
      "protection": 0.08
    }
  },
  {
    "id": "savings-08-大额存单",
    "name": "招商银行 / 平安银行「大额存单」（20 万起，1-3 年）",
    "category": "savings",
    "shortType": "单",
    "price": "5%-20%",
    "riskTier": "低风险",
    "level": 2,
    "term": "1-3 年",
    "threshold": "20 万元起",
    "liquidity": "中（可转让或提前支取扣息）",
    "stage": "核心层",
    "account": "现金与储蓄账户",
    "role": "在普通定期基础上提高收益率约 10-30 bp，适合已经有 20 万以上养老储备并需要锁定利率的人群。",
    "suitable": "适合资产已有一定规模（50 万以上总资产）、希望在储蓄层获取最优确定性收益的人群。",
    "caution": "提前支取按活期计息，损失较大；招行、平安大额存单可在 App 内转让，但受让方较少，勿视为高流动性产品。",
    "summary": "大额存单利率一般比同期定存高 10-30 bp，20-50 万元可买到 3 年期约 2.5%-3% 的利率（根据银行和时点浮动），具有存款保险保障（50 万以内），是养老储蓄层中在安全性和收益之间最优的工具之一。",
    "tags": ["大额存单", "存款保险", "利率锁定"],
    "feeFocus": "比较不同银行发行利率（股份制行通常高于国有大行）；注意 20 万/30 万/50 万不同面额的利率差异。",
    "selectionTips": "先确认资金用途和可锁定期限，再决定活期、通知、定期或阶梯结构。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "stability": 0.36,
      "liquidity": 0.18,
      "pensionGap": 0.16,
      "discipline": 0.12,
      "contribution": 0.1,
      "protection": 0.08
    }
  },
  {
    "id": "savings-09-通知存款",
    "name": "中国银行「通知存款」（1 日通知 / 7 日通知）",
    "category": "savings",
    "shortType": "通",
    "price": "3%-10%",
    "riskTier": "低风险",
    "level": 1,
    "term": "1 日通知 / 7 日通知",
    "threshold": "5 万元起（1 日通知），5 万元起（7 日通知）",
    "liquidity": "中高",
    "stage": "起步层",
    "account": "现金与储蓄账户",
    "role": "在活期与定期之间作为过渡：利率高于活期（7 日约 1.35%），支取前提前通知即可。",
    "suitable": "适合已有活期但觉得利率偏低、且不确定确切用款日期的人群。",
    "caution": "规模门槛偏高（5 万元起），规模较小建议直接用货币基金替代；提前支取不满通知期则按活期计息。",
    "summary": "通知存款在国有大行中是介于活期（约 0.2%）和短期定存之间的过渡品种，7 日通知约 1.35%，提前 7 天告知银行即可取款，适合养老账户中「3 个月内可能动用」的资金层。",
    "tags": ["通知存款", "高活期替代", "5万起"],
    "feeFocus": "重点比较到账速度、支取限制、账户分离和自动转入规则。",
    "selectionTips": "先确认资金用途和可锁定期限，再决定活期、通知、定期或阶梯结构。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "liquidity": 0.38,
      "stability": 0.2,
      "protection": 0.12,
      "pensionGap": 0.12,
      "contribution": 0.1,
      "risk": 0.08
    }
  },
  {
    "id": "savings-10-微信零钱通",
    "name": "腾讯理财通「零钱通」（华夏幸福货币基金）",
    "category": "savings",
    "shortType": "腾",
    "price": "2%-8%",
    "riskTier": "低风险",
    "level": 1,
    "term": "随用随取",
    "threshold": "1 分钱起",
    "liquidity": "高",
    "stage": "起步层",
    "account": "现金与储蓄账户",
    "role": "在微信生态内为养老备用金提供现金管理，T+0 实时赎回，适合微信支付主力用户。",
    "suitable": "适合日常用微信支付较多、希望少开 App 管理养老现金垫的人群。",
    "caution": "底层为货币基金，净值存在极低波动风险；收益与余额宝等同，不要过度配置。",
    "summary": "微信零钱通底层接入多家货币基金，7 日年化与余额宝大致相当（约 1.5%-2%），可直接在微信红包、转账和支付时调用，减少养老应急金的摩擦成本，适合与余额宝二选一配置。",
    "tags": ["零钱通", "微信生态", "T+0"],
    "feeFocus": "重点比较到账速度、支取限制、账户分离和自动转入规则。",
    "selectionTips": "先确认资金用途和可锁定期限，再决定活期、通知、定期或阶梯结构。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "liquidity": 0.4,
      "stability": 0.2,
      "protection": 0.12,
      "pensionGap": 0.12,
      "contribution": 0.1,
      "risk": 0.06
    }
  },
  {
    "id": "savings-11-平安银行智能存款",
    "name": "平安银行「平安盈」智能存款（1 年期）",
    "category": "savings",
    "shortType": "平",
    "price": "5%-15%",
    "riskTier": "低风险",
    "level": 1,
    "term": "1 年",
    "threshold": "50 元起",
    "liquidity": "中高",
    "stage": "起步层",
    "account": "现金与储蓄账户",
    "role": "门槛低、支持提前支取（按实际持有天数计收益），适合初期建仓阶段的低门槛养老账户。",
    "suitable": "适合养老储蓄起步阶段、资金规模较小（10 万以内）、希望提前支取不扣息的人群。",
    "caution": "提前支取收益按持有天数计算（略低于到期收益率），但高于活期；注意平安银行存款保险上限。",
    "summary": "平安银行平安盈 1 年期利率约 2.0%-2.4%（根据时点浮动），支持提前支取按天计息，是国内股份制银行中灵活性较好的小额存款产品，适合月投积累阶段的养老低门槛底仓。",
    "tags": ["平安盈", "按天计息", "灵活存款"],
    "feeFocus": "重点比较到账速度、支取限制、账户分离和自动转入规则。",
    "selectionTips": "先确认资金用途和可锁定期限，再决定活期、通知、定期或阶梯结构。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "stability": 0.3,
      "liquidity": 0.28,
      "pensionGap": 0.16,
      "discipline": 0.12,
      "contribution": 0.08,
      "protection": 0.06
    }
  },
  {
    "id": "savings-12-弹性储蓄计划",
    "name": "微众银行「活期+」弹性养老储蓄计划",
    "category": "savings",
    "shortType": "弹",
    "price": "5%-15%",
    "riskTier": "低风险",
    "level": 1,
    "term": "每月滚动，可暂停",
    "threshold": "1 元起",
    "liquidity": "高",
    "stage": "起步层",
    "account": "现金与储蓄账户",
    "role": "允许收入低月份暂停、高月份补投，底层接入货币基金，降低执行压力。",
    "suitable": "适合自由职业、经营收入或佣金收入波动较大的人群。",
    "caution": "需要设置年度最低投入目标，避免长期停投；微众银行无实体网点，操作须通过 App。",
    "summary": "微众银行「活期+」底层对接博时货币基金，收益略高于余额宝，支持「按收入弹性投入」——丰收月多存、淡月暂停，配合微众 App 的「养老专户」标签管理，减少不规律收入人群的执行压力。",
    "tags": ["活期+", "弹性投入", "自由职业适配"],
    "feeFocus": "重点比较到账速度、支取限制、账户分离和自动转入规则。",
    "selectionTips": "先确认资金用途和可锁定期限，再决定活期、通知、定期或阶梯结构。",
    "rebalance": "每月检查自动划转是否执行，每半年复盘现金垫是否过高或不足。",
    "weights": {
      "stability": 0.28,
      "liquidity": 0.3,
      "pensionGap": 0.14,
      "discipline": 0.12,
      "contribution": 0.1,
      "protection": 0.06
    }
  },
  // ─── 理财 (wealth) ───────────────────────────────────────────────────────
  {
    "id": "wealth-01-招行招睿养老理财",
    "name": "招银理财「招睿颐养稳健养老理财」（1 年封闭期）",
    "category": "wealth",
    "shortType": "睿",
    "price": "15%-35%",
    "riskTier": "中低风险",
    "level": 2,
    "term": "12 个月封闭期",
    "threshold": "1 元起（部分系列 1 万起）",
    "liquidity": "低（封闭期内不可赎回）",
    "stage": "核心层",
    "account": "稳健理财账户",
    "role": "养老理财试点产品，底层配置固收资产为主，提供高于存款的稳健收益，专为养老规划设计。",
    "suitable": "适合有 1 年以上不动用的中短期养老资金、能接受轻微净值波动的人群。",
    "caution": "净值型产品，不保本；封闭期内赎回受限，不能用于 6 个月内可能动用的资金。",
    "summary": "招银理财「招睿颐养稳健」是银保监试点的首批养老理财产品之一，底层以利率债、信用债为主，历史业绩年化约 3%-4%（非保证），实行净值管理，1 年封闭期有助于行为纪律。2024 年后扩大发行城市和额度。",
    "tags": ["招睿颐养", "养老理财试点", "净值型"],
    "feeFocus": "重点比较管理费（约 0.1%-0.3%）、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "stability": 0.3,
      "contribution": 0.18,
      "risk": 0.14,
      "pensionGap": 0.14,
      "horizon": 0.1,
      "liquidity": 0.08,
      "discipline": 0.06
    }
  },
  {
    "id": "wealth-02-工银理财全鑫养老",
    "name": "工银理财「全鑫养老理财」（3 年封闭期）",
    "category": "wealth",
    "shortType": "鑫",
    "price": "10%-30%",
    "riskTier": "中低风险",
    "level": 2,
    "term": "36 个月",
    "threshold": "1 元起",
    "liquidity": "低",
    "stage": "核心层",
    "account": "稳健理财账户",
    "role": "用 3 年封闭期换取投资纪律，承接一段时间不动用的养老资金，获取优于储蓄的稳健收益。",
    "suitable": "适合应急金充足（≥6 个月支出）、有 3 年闲置资金希望提升收益的人群。",
    "caution": "3 年封闭期内无法提前赎回；作为工行养老理财试点产品，购买须通过工行渠道和风险测评。",
    "summary": "工银理财「全鑫养老」是工行养老理财试点产品，3 年封闭期底层以中长期信用债和少量权益（5%-10%）为主，年化业绩基准约 3.5%-4.5%（非承诺），是工行储蓄客户进阶养老理财的核心产品。",
    "tags": ["全鑫养老", "3年封闭", "养老理财试点"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "stability": 0.34,
      "liquidity": 0.14,
      "contribution": 0.14,
      "risk": 0.12,
      "pensionGap": 0.12,
      "discipline": 0.08,
      "protection": 0.06
    }
  },
  {
    "id": "wealth-03-货币基金现金管理",
    "name": "华夏基金「华夏现金增利 A」货币基金（000014）",
    "category": "wealth",
    "shortType": "现",
    "price": "5%-15%",
    "riskTier": "低-中低风险",
    "level": 1,
    "term": "每日/T+0",
    "threshold": "1 元起",
    "liquidity": "高",
    "stage": "起步层",
    "account": "稳健理财账户",
    "role": "放置待配置的理财账户过渡资金，提供高于余额宝约 10-20 bp 的短期收益，T+0 快速赎回。",
    "suitable": "适合刚完成测评、还在分批建仓或近期有不确定支出的人群。",
    "caution": "单日快速赎回额度约 1 万元；投资者应定期搜索「7 日年化对比表」，持续选择收益较高的货基。",
    "summary": "华夏现金增利 A（000014）是华夏基金旗下规模较大的货币基金，7 日年化通常略优于余额宝，可在天天基金、蚂蚁基金等平台购买，适合养老理财账户内的过渡资金管理。",
    "tags": ["000014", "华夏货基", "过渡资金"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "risk": 0.22,
      "stability": 0.22,
      "contribution": 0.18,
      "horizon": 0.14,
      "pensionGap": 0.1,
      "liquidity": 0.08,
      "discipline": 0.06
    }
  },
  {
    "id": "wealth-04-易方达纯债基金",
    "name": "易方达「中短债债券 A」（110027）",
    "category": "wealth",
    "shortType": "债",
    "price": "10%-25%",
    "riskTier": "中低风险",
    "level": 2,
    "term": "持有 6-18 个月更佳",
    "threshold": "1 元起",
    "liquidity": "中",
    "stage": "核心层",
    "account": "稳健理财账户",
    "role": "以中短期信用债和国债为核心，在控制久期风险的前提下获取高于货币基金的稳健收益。",
    "suitable": "适合风险承受较低但希望高于储蓄收益、可接受轻微净值波动的人群。",
    "caution": "利率上行期净值可能出现短期下跌，不能将债基当存款；申购后建议持有 6 个月以上减少磨损。",
    "summary": "易方达中短债（110027）成立多年，最大回撤历史上约 0.5%-1.5%，年化收益通常在 2.5%-4%（随利率环境变化），是基金货架中性价比较高的纯债型产品，可在天天基金、支付宝基金购买。",
    "tags": ["110027", "易方达中短债", "纯债基金"],
    "feeFocus": "重点比较管理费（约 0.3%）、托管费、申赎费；关注最大回撤和久期。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "stability": 0.3,
      "contribution": 0.18,
      "risk": 0.14,
      "pensionGap": 0.14,
      "horizon": 0.1,
      "liquidity": 0.08,
      "discipline": 0.06
    }
  },
  {
    "id": "wealth-05-建信养老理财现金流",
    "name": "建信理财「安享固收养老理财」（月度分配型）",
    "category": "wealth",
    "shortType": "流",
    "price": "5%-20%",
    "riskTier": "中低风险",
    "level": 2,
    "term": "按月/按季分配",
    "threshold": "1 万元起",
    "liquidity": "中",
    "stage": "核心层",
    "account": "稳健理财账户",
    "role": "为退休前后提供每月或每季的周期性现金流分配，模拟退休月薪节奏。",
    "suitable": "适合 50 岁以上、希望提前演练退休收入节奏、或已退休需补充社保现金流的人群。",
    "caution": "分配来源于产品收益，本金净值仍随市场波动；月分配不等于保本保收益。",
    "summary": "建信理财「安享固收」是建设银行理财子公司旗下的月度分配型产品，底层以固收资产为主，每月向持有人分配部分收益，适合退休人员或临近退休者将其作为养老补贴来源；业绩基准约 3%-4%（非承诺）。",
    "tags": ["安享固收", "月度分配", "建信理财"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "stability": 0.34,
      "liquidity": 0.14,
      "contribution": 0.14,
      "risk": 0.12,
      "pensionGap": 0.12,
      "discipline": 0.08,
      "protection": 0.06
    }
  },
  {
    "id": "wealth-06-兴银理财多资产稳健",
    "name": "兴银理财「兴合稳健 FOF 型理财」（多资产均衡）",
    "category": "wealth",
    "shortType": "组",
    "price": "10%-25%",
    "riskTier": "中风险",
    "level": 3,
    "term": "1-3 年（定开型）",
    "threshold": "1 万元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "稳健理财账户",
    "role": "在债券、权益、货币类资产之间分散配置（约 7:2:1），降低单一资产风险，获取多元收益。",
    "suitable": "适合有一定投资经验、想少调仓但接受适度波动（最大回撤约 5% 以内）的人群。",
    "caution": "需理解底层权益 10%-20% 的波动风险；与基金账户中的基金组合注意重叠度。",
    "summary": "兴银理财「兴合稳健」是兴业银行理财子公司旗下的多资产 FOF 型产品，通过投资债基、权益基金和货基的组合，实现 3 年期年化业绩基准约 3.5%-4.5%，适合连接储蓄和长期基金之间的「过渡增值层」。",
    "tags": ["兴合稳健", "FOF型", "多资产"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "risk": 0.22,
      "stability": 0.22,
      "contribution": 0.18,
      "horizon": 0.14,
      "pensionGap": 0.1,
      "liquidity": 0.08,
      "discipline": 0.06
    }
  },
  {
    "id": "wealth-07-宁银理财全天候",
    "name": "宁银理财「天天利增强型」（全天候固收+）",
    "category": "wealth",
    "shortType": "候",
    "price": "10%-25%",
    "riskTier": "中风险",
    "level": 3,
    "term": "2-3 年（定开）",
    "threshold": "1 万元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "稳健理财账户",
    "role": "通过债券底仓叠加 10%-15% 权益增强，在不同市场环境下保持相对稳定的超额收益。",
    "suitable": "适合希望用一只产品跨越多个市场周期、不做频繁调仓的人群。",
    "caution": "全天候不代表不回撤，极端市场（如 2022 年债券熊市）仍可能出现净值下跌；不适合 1 年内用钱的资金。",
    "summary": "宁银理财「天天利」是宁波银行旗下的中长期固收增强产品，历史最大回撤约 1%-2%，年化业绩基准约 4%-5%（非承诺），适合在养老稳健层中追求比纯债更高弹性的组合角色。",
    "tags": ["天天利", "固收+", "宁银理财"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "stability": 0.3,
      "contribution": 0.18,
      "risk": 0.14,
      "pensionGap": 0.14,
      "horizon": 0.1,
      "liquidity": 0.08,
      "discipline": 0.06
    }
  },
  {
    "id": "wealth-08-国寿安保稳健理财",
    "name": "国寿安保理财「安盈稳健固收增强」",
    "category": "wealth",
    "shortType": "安",
    "price": "5%-20%",
    "riskTier": "中风险",
    "level": 3,
    "term": "1-3 年",
    "threshold": "1 万元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "稳健理财账户",
    "role": "中国人寿资产管理旗下产品，兼顾固收底仓与权益增强，适合保险系客户统一管理养老资产。",
    "suitable": "适合有明确回撤边界（约 5%）、希望少调仓、且已持有中国人寿保险产品的人群。",
    "caution": "目标波动不等于收益目标，极端市场仍可能偏离；需先完成国寿渠道风险测评。",
    "summary": "国寿安保理财是保险系理财子公司的代表，「安盈稳健固收增强」底层约 80% 固收 + 20% 权益，历史年化约 3.5%-5%（随市场变化），适合保险客户在单一平台统一管理储蓄、基金和保险资产。",
    "tags": ["国寿安保", "保险系理财", "固收增强"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "stability": 0.34,
      "liquidity": 0.14,
      "contribution": 0.14,
      "risk": 0.12,
      "pensionGap": 0.12,
      "discipline": 0.08,
      "protection": 0.06
    }
  },
  {
    "id": "wealth-09-平安证券固收fof",
    "name": "平安证券「养老稳健 FOF 型理财」",
    "category": "wealth",
    "shortType": "平F",
    "price": "5%-20%",
    "riskTier": "中风险",
    "level": 3,
    "term": "1-3 年",
    "threshold": "1 万元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "稳健理财账户",
    "role": "通过投资多只基金或资管产品实现二次分散，降低单只基金选择压力。",
    "suitable": "适合希望借助专业管理人做基金筛选，但不想自己做研究的人群。",
    "caution": "需关注双层费率叠加（基础费 + 底层基金管理费）和底层持仓透明度；收益受底层基金表现影响较大。",
    "summary": "平安证券养老 FOF 理财通过投资市场上已发行的基金产品构建组合，享受大类资产配置和基金优选的双重价值；底层以固收基金为主、少量权益基金增强，年化业绩基准约 3.5%-4.5%。",
    "tags": ["养老FOF", "双重分散", "平安证券"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "risk": 0.22,
      "stability": 0.22,
      "contribution": 0.18,
      "horizon": 0.14,
      "pensionGap": 0.1,
      "liquidity": 0.08,
      "discipline": 0.06
    }
  },
  {
    "id": "wealth-10-招行日日盈滚动",
    "name": "招商银行「日日盈」7-90 天滚动理财",
    "category": "wealth",
    "shortType": "滚",
    "price": "5%-15%",
    "riskTier": "中低风险",
    "level": 1,
    "term": "7-90 天滚动",
    "threshold": "1 元起",
    "liquidity": "中高",
    "stage": "起步层",
    "account": "稳健理财账户",
    "role": "用短周期滚动方式管理「近期不用但不宜长期锁定」的养老资金，提升闲钱效率。",
    "suitable": "适合现金流节奏不确定、但想让近期闲置资金获得高于货基收益的人群。",
    "caution": "到期日和实际用钱日期要匹配；避免到期后未及时续作导致资金闲置。",
    "summary": "招商银行「日日盈」是低门槛、短周期的净值型理财，底层主要为货币市场工具和短债，7 天期年化通常约 2%-3%，可在 App「理财」首页搜索「日日盈」购买，是货币基金的进阶替代。",
    "tags": ["日日盈", "短周期滚动", "招商银行"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "stability": 0.3,
      "contribution": 0.18,
      "risk": 0.14,
      "pensionGap": 0.14,
      "horizon": 0.1,
      "liquidity": 0.08,
      "discipline": 0.06
    }
  },
  {
    "id": "wealth-11-企业年金衔接理财",
    "name": "泰康资产「企业年金账户稳健型」产品组合",
    "category": "wealth",
    "shortType": "企",
    "price": "5%-20%",
    "riskTier": "中低风险",
    "level": 2,
    "term": "1-3 年",
    "threshold": "1 万元起",
    "liquidity": "中",
    "stage": "核心层",
    "account": "稳健理财账户",
    "role": "用于衔接企业年金、职业年金或离职后资产转移期的资金管理。",
    "suitable": "适合拥有企业年金但离职后不确定如何整合的人群。",
    "caution": "需核对单位年金规则和税务影响（年金领取时需缴税）；泰康渠道需联系经纪人操作。",
    "summary": "泰康资产管理是国内企业年金受托规模最大的机构之一，「稳健型」产品以信用债和国债为底层，年化目标收益约 3%-4.5%，适合企业年金账户内的「守成」策略，离职人员可通过泰康渠道咨询账户转移方案。",
    "tags": ["泰康资产", "企业年金", "账户衔接"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "risk": 0.22,
      "stability": 0.22,
      "contribution": 0.18,
      "horizon": 0.14,
      "pensionGap": 0.1,
      "liquidity": 0.08,
      "discipline": 0.06
    }
  },
  {
    "id": "wealth-12-中银理财临退低波",
    "name": "中银理财「稳富睿远养老理财」（3 年封闭）",
    "category": "wealth",
    "shortType": "远",
    "price": "10%-30%",
    "riskTier": "中低风险",
    "level": 2,
    "term": "36 个月",
    "threshold": "1 万元起",
    "liquidity": "低",
    "stage": "核心层",
    "account": "稳健理财账户",
    "role": "专为临近退休客群设计，侧重低波动、保值增值，为领取期过渡做准备。",
    "suitable": "适合 55 岁以上或风险偏好明显下降、有 3 年不用的资金且希望收益稳健的人群。",
    "caution": "3 年封闭期不可提前赎回；不能只看近期净值，应重点关注回撤和久期分布。",
    "summary": "中银理财「稳富睿远」是中国银行理财子面向临近退休群体推出的养老理财产品，底层 90% 以上为固收，权益敞口低于 10%，历史年化约 3.5%-4.5%，适合作为 55-60 岁群体的「去波动」过渡仓位。",
    "tags": ["稳富睿远", "临退低波", "中银理财"],
    "feeFocus": "重点比较管理费、销售费、业绩报酬规则和底层资产透明度。",
    "selectionTips": "先看风险等级、封闭期和最大回撤，再看收益表现。",
    "rebalance": "到期前 2 周复盘续作，避免到期资金闲置或误入高风险产品。",
    "weights": {
      "stability": 0.3,
      "contribution": 0.18,
      "risk": 0.14,
      "pensionGap": 0.14,
      "horizon": 0.1,
      "liquidity": 0.08,
      "discipline": 0.06
    }
  },
  // ─── 基金 (fund) ─────────────────────────────────────────────────────────
  {
    "id": "fund-01-南方养老2040",
    "name": "南方基金「养老目标日期 2040 三年持有 A」（006246）",
    "category": "fund",
    "shortType": "40",
    "price": "15%-40%",
    "riskTier": "中风险",
    "level": 2,
    "term": "3 年持有期，10 年以上更佳",
    "threshold": "10 元起定投",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "根据 2040 退休年份动态降低权益比例（glide path），是长期养老资金的核心增长工具。",
    "suitable": "适合预计 2035-2045 年间退休、愿意长期定投且不想频繁调仓的人群（当前约 40-48 岁）。",
    "caution": "3 年持有期内不可赎回；目标年份越近、权益比例越低，选错年份会影响收益弹性。",
    "summary": "南方养老 2040（006246）是国内首批公募养老目标日期基金之一，初始权益上限约 65%，随时间逐步降至 20%；基金经理采用 FOF 结构投资底层基金，成立以来年化约 4%-6%（非保证）。可在天天基金、支付宝基金直接购买，支持最低 10 元定投。",
    "tags": ["006246", "南方2040", "目标日期"],
    "feeFocus": "管理费 0.6%，托管费 0.15%；申购费率打折后约 0.1%-0.15%；关注持有期满赎回费。",
    "selectionTips": "先确认自己预计退休年份（如 2038 年退休，选 2040 产品），其次确认 3 年持有期与资金时间匹配。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "horizon": 0.28,
      "risk": 0.24,
      "discipline": 0.18,
      "contribution": 0.14,
      "pensionGap": 0.1,
      "stability": 0.04,
      "liquidity": 0.02
    }
  },
  {
    "id": "fund-02-华夏养老2045",
    "name": "华夏基金「养老目标日期 2045 三年持有 A」（007241）",
    "category": "fund",
    "shortType": "45",
    "price": "10%-35%",
    "riskTier": "中风险",
    "level": 2,
    "term": "3 年持有期，10 年以上更佳",
    "threshold": "10 元起定投",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "按 2045 退休年份设计的 glide path 基金，初始权益敞口更高（约 70%），适合更年轻的积累期投资者。",
    "suitable": "适合预计 2040-2050 年间退休、愿意承受更高回撤换取更高长期回报的人群（当前约 35-45 岁）。",
    "caution": "前期权益比例较高，短期回撤可能较大（历史最大回撤约 20%-30%），需要心理准备和止损纪律。",
    "summary": "华夏养老 2045（007241）是华夏基金旗下的目标日期型 FOF，底层投资华夏旗下及外部优质基金；初始权益比例约 60%-70%，逐年下降；成立以来年化约 3%-7%（波动较大，取决于成立时间和市场周期）。",
    "tags": ["007241", "华夏2045", "目标日期"],
    "feeFocus": "重点比较管理费、托管费、销售服务费、申赎费和持有期限制。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "risk": 0.3,
      "horizon": 0.2,
      "contribution": 0.16,
      "discipline": 0.14,
      "pensionGap": 0.1,
      "stability": 0.06,
      "liquidity": 0.04
    }
  },
  {
    "id": "fund-03-沪深300指数定投",
    "name": "华泰柏瑞「沪深 300 ETF 联接 A」（000051）",
    "category": "fund",
    "shortType": "300",
    "price": "5%-25%",
    "riskTier": "中高风险",
    "level": 2,
    "term": "7 年以上更佳",
    "threshold": "10 元起定投",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "跟踪沪深 300 指数，提供 A 股核心宽基的长期权益增长弹性，是养老缺口修复的主力工具。",
    "suitable": "适合 35-45 岁、能承受 20%-30% 回撤、愿意 7 年以上定投的人群。",
    "caution": "不适合短期资金和不能接受本金波动的人群；定投时不要设置自动止盈过低（建议 15% 以上）。",
    "summary": "华泰柏瑞沪深 300 ETF 联接 A（000051）是国内规模最大的沪深 300 指数基金之一，管理费 0.5%+托管费 0.1%，费率极低；2004 年以来沪深 300 年化约 7%-10%（含分红），定投 10 年以上胜率显著高于主动基金。",
    "tags": ["000051", "沪深300", "指数定投"],
    "feeFocus": "管理费 0.5%，托管费 0.1%；与易方达沪深 300（110020）比价，选规模更大者。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "stability": 0.24,
      "risk": 0.18,
      "liquidity": 0.16,
      "horizon": 0.14,
      "contribution": 0.12,
      "pensionGap": 0.1,
      "discipline": 0.06
    }
  },
  {
    "id": "fund-04-兴全趋势平衡基金",
    "name": "兴全基金「兴全趋势投资混合（LOF）」（163402）",
    "category": "fund",
    "shortType": "衡",
    "price": "5%-20%",
    "riskTier": "中风险",
    "level": 2,
    "term": "3-5 年以上",
    "threshold": "10 元起定投",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "股债平衡策略，权益仓位灵活在 0%-95%，基金经理根据市场估值主动调整，降低单边市场依赖。",
    "suitable": "适合既想参与 A 股增长、又不希望权益占比过高、看重主动择时的人群。",
    "caution": "基金经理风险较强（董承非 / 谢治宇均曾管理此基金），换人后风格可能变化；仍可能出现阶段性回撤。",
    "summary": "兴全趋势（163402）是国内老牌灵活配置型基金，成立以来年化约 14%（含市场景气周期），历史最大回撤约 40%；基金经理主动降仓时回撤明显低于市场，适合作为养老基金组合中的「核心灵活仓」。",
    "tags": ["163402", "兴全趋势", "灵活配置"],
    "feeFocus": "管理费 1.5%，申购费打折后约 0.1%-0.15%；LOF 可在二级市场折溢价交易，注意溢价风险。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "horizon": 0.28,
      "risk": 0.24,
      "discipline": 0.18,
      "contribution": 0.14,
      "pensionGap": 0.1,
      "stability": 0.04,
      "liquidity": 0.02
    }
  },
  {
    "id": "fund-05-中短债基金",
    "name": "博时基金「博时稳定价值债券 A」（050009）",
    "category": "fund",
    "shortType": "短",
    "price": "5%-15%",
    "riskTier": "中低风险",
    "level": 1,
    "term": "持有 6-18 个月更佳",
    "threshold": "10 元起",
    "liquidity": "中高",
    "stage": "起步层",
    "account": "长期投资账户",
    "role": "在基金账户内承担低波动过渡和债券底仓角色，连接货币基金和权益基金之间的风险梯度。",
    "suitable": "适合刚接触基金、希望从低波动品种开始建仓的人群。",
    "caution": "净值也会随利率上下波动，不能等同活期或存款；当利率快速上行时净值可能短暂下跌。",
    "summary": "博时稳定价值债券 A（050009）成立已超 15 年，主要持有 3 年以内中短期债券，历史最大回撤约 1.5%，年化收益约 3%-4%，是养老基金账户中债券底仓的长期稳定产品，可在支付宝基金 0 申购费购买。",
    "tags": ["050009", "博时稳定价值", "中短债"],
    "feeFocus": "管理费 0.3%，托管费 0.1%；申购费打折后约 0%（天天基金等平台免申购费）。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "risk": 0.3,
      "horizon": 0.2,
      "contribution": 0.16,
      "discipline": 0.14,
      "pensionGap": 0.1,
      "stability": 0.06,
      "liquidity": 0.04
    }
  },
  {
    "id": "fund-06-中证红利低波ETF",
    "name": "华泰柏瑞「红利低波 ETF 联接 A」（013309）",
    "category": "fund",
    "shortType": "红",
    "price": "5%-15%",
    "riskTier": "中风险",
    "level": 2,
    "term": "5 年以上更佳",
    "threshold": "10 元起定投",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "跟踪中证红利低波动指数，通过高股息 + 低波动双因子筛选，增加组合现金回报的多样性。",
    "suitable": "适合希望权益配置更稳健、偏好股息收入、但仍能接受阶段性波动的人群。",
    "caution": "红利风格会出现阶段性跑输（如 2020-2021 年成长市），不能替代整体资产配置；注意行业集中度（银行、煤炭等）。",
    "summary": "华泰柏瑞红利低波 ETF 联接 A（013309）跟踪中证红利低波动 100 指数，成分股聚焦高股息低 Beta 个股，历史年化收益约 8%-12%，最大回撤比沪深 300 低约 30%，适合养老基金组合中的「压舱石权益」。",
    "tags": ["013309", "红利低波", "高股息"],
    "feeFocus": "管理费 0.15%，托管费 0.05%；注意与 ETF 场内版（562680）比价，场外联接有跟踪误差。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "stability": 0.24,
      "risk": 0.18,
      "liquidity": 0.16,
      "horizon": 0.14,
      "contribution": 0.12,
      "pensionGap": 0.1,
      "discipline": 0.06
    }
  },
  {
    "id": "fund-07-易方达亚洲精选",
    "name": "易方达基金「亚洲精选股票型 A」（118001）",
    "category": "fund",
    "shortType": "海",
    "price": "3%-15%",
    "riskTier": "中高风险",
    "level": 3,
    "term": "5 年以上更佳",
    "threshold": "10 元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "长期投资账户",
    "role": "通过配置亚洲（港股 + 美股 ADR + 东南亚）优质股票，分散 A 股单一市场风险。",
    "suitable": "适合已有国内资产、希望用少量仓位做海外分散的人群。",
    "caution": "汇率风险、港股流动性风险和额度限制须关注；海外市场波动可能与国内不同步，短期放大组合波动。",
    "summary": "易方达亚洲精选（118001）是国内 QDII 基金中运作时间较长的产品，主要投资港股和亚洲优质蓝筹，年化约 6%-10%（随美元利率和港股周期大幅波动），适合作为养老基金组合中 5%-10% 的海外分散仓位。",
    "tags": ["118001", "易方达亚洲", "QDII"],
    "feeFocus": "管理费 1.5%，额外有汇率对冲成本；注意 QDII 基金定期限购，须定期检查是否开放申购。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "horizon": 0.28,
      "risk": 0.24,
      "discipline": 0.18,
      "contribution": 0.14,
      "pensionGap": 0.1,
      "stability": 0.04,
      "liquidity": 0.02
    }
  },
  {
    "id": "fund-08-广发养老2035fof",
    "name": "广发基金「养老目标日期 2035 三年持有 A」（005968）",
    "category": "fund",
    "shortType": "35",
    "price": "5%-20%",
    "riskTier": "中风险",
    "level": 3,
    "term": "3 年持有期，5 年以上更佳",
    "threshold": "10 元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "长期投资账户",
    "role": "通过 FOF 结构投资多只基金，降低单只基金选择压力，适合 2030-2040 退休群体。",
    "suitable": "适合预计 2030-2040 退休、希望专业管理人做二次筛选的人群（当前约 45-52 岁）。",
    "caution": "需关注双层费率（FOF 管理费 + 底层基金管理费）和持仓透明度；选错目标年份影响权益配比。",
    "summary": "广发养老 2035（005968）是广发基金旗下的养老目标日期 FOF，底层以广发旗下和外部基金为主，当前权益比例约 35%-50%（随年份接近逐步降低），成立以来年化约 3%-6%。",
    "tags": ["005968", "广发2035", "养老FOF"],
    "feeFocus": "重点比较管理费、托管费、销售服务费、申赎费和持有期限制。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "risk": 0.3,
      "horizon": 0.2,
      "contribution": 0.16,
      "discipline": 0.14,
      "pensionGap": 0.1,
      "stability": 0.06,
      "liquidity": 0.04
    }
  },
  {
    "id": "fund-09-沪深300增强",
    "name": "华夏基金「沪深 300 增强策略 ETF」（159619）",
    "category": "fund",
    "shortType": "增",
    "price": "3%-15%",
    "riskTier": "中高风险",
    "level": 3,
    "term": "5 年以上更佳",
    "threshold": "场内 100 元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "长期投资账户",
    "role": "在沪深 300 基础上，通过量化模型争取年化 1%-3% 的超额收益（Alpha）。",
    "suitable": "适合有一定基金经验、期望在宽基指数基础上获取 Alpha 的人群。",
    "caution": "增强策略不保证超额：市场风格极端时可能阶段性跑输基准；场内 ETF 需在证券账户操作。",
    "summary": "华夏沪深 300 增强 ETF（159619）是国内首批指数增强 ETF，量化模型在沪深 300 成分股基础上做偏离，历史超额年化约 1%-3%，费率约 0.5%，适合在养老组合宽基仓位上寻求额外收益弹性。",
    "tags": ["159619", "沪深300增强", "量化Alpha"],
    "feeFocus": "管理费 0.5%；场内交易有交易佣金，注意折溢价率（保持接近净值买入）。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "stability": 0.24,
      "risk": 0.18,
      "liquidity": 0.16,
      "horizon": 0.14,
      "contribution": 0.12,
      "pensionGap": 0.1,
      "discipline": 0.06
    }
  },
  {
    "id": "fund-10-平安低波权益",
    "name": "平安基金「中证低波动红利 100 ETF」（515560）",
    "category": "fund",
    "shortType": "低",
    "price": "3%-12%",
    "riskTier": "中风险",
    "level": 2,
    "term": "5 年以上更佳",
    "threshold": "场内 100 元起 / 场外 10 元起",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "在权益资产中通过「低波动 + 高红利」因子筛选，降低最大回撤，提高持有体验。",
    "suitable": "适合希望权益配置更温和、能接受比纯债稍高波动但想减少心理负担的人群。",
    "caution": "低波不等于低风险，市场系统性大跌（如 2018、2022 年）仍会亏损；注意银行、煤炭集中度。",
    "summary": "平安低波红利 100 ETF（515560）跟踪中证低波动红利 100 指数，组合波动率约为沪深 300 的 70%，历史最大回撤约 25%-35%，但分红再投资后年化收益与沪深 300 相近，适合养老组合中的「温和权益」配置。",
    "tags": ["515560", "低波红利ETF", "温和权益"],
    "feeFocus": "管理费 0.15%；场内交易注意流动性（成交量偏低时滑点稍大）。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "horizon": 0.28,
      "risk": 0.24,
      "discipline": 0.18,
      "contribution": 0.14,
      "pensionGap": 0.1,
      "stability": 0.04,
      "liquidity": 0.02
    }
  },
  {
    "id": "fund-11-景顺长城鼎益",
    "name": "景顺长城「鼎益混合」（260108）",
    "category": "fund",
    "shortType": "质",
    "price": "3%-12%",
    "riskTier": "中高风险",
    "level": 3,
    "term": "7 年以上更佳",
    "threshold": "10 元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "长期投资账户",
    "role": "专注盈利质量高、现金流稳健的成长型企业，作为长期 Alpha 增强来源。",
    "suitable": "适合长期资金、风险承受能力较高、愿意接受 3-5 年低谷期的人群。",
    "caution": "成长风格在估值收缩周期（如 2021-2022 年）可能大幅跑输，应与红利、指数组合搭配，不宜单独持有。",
    "summary": "景顺长城鼎益（260108）由刘彦春长期管理，偏好消费、医药领域的高质量成长股，成立以来年化约 15%-20%（包含 2006-2021 年牛市区间），但 2021 年以来最大回撤超 50%，适合作为养老基金组合中 5%-10% 的主动增强仓位。",
    "tags": ["260108", "景顺鼎益", "质量成长"],
    "feeFocus": "管理费 1.5%；历史业绩受基金经理管理风格影响大，需关注换人公告。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "risk": 0.3,
      "horizon": 0.2,
      "contribution": 0.16,
      "discipline": 0.14,
      "pensionGap": 0.1,
      "stability": 0.06,
      "liquidity": 0.04
    }
  },
  {
    "id": "fund-12-中证医疗ETF",
    "name": "华宝基金「中证医疗 ETF」（512170）",
    "category": "fund",
    "shortType": "医",
    "price": "2%-10%",
    "riskTier": "中高风险",
    "level": 3,
    "term": "5 年以上更佳",
    "threshold": "场内 100 元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "长期投资账户",
    "role": "通过医疗服务和医疗器械主题投资对冲未来医疗支出压力，兼顾主题配置和老龄化趋势。",
    "suitable": "适合对养老医疗产业主题感兴趣、已有核心宽基配置的人群。",
    "caution": "行业政策（医保控费、集采）和估值波动较大，2021-2023 年最大回撤超 60%；不宜作为唯一权益资产。",
    "summary": "华宝中证医疗 ETF（512170）跟踪中证医疗指数，成分股以医疗器械、血液制品和民营医院为主，长期受老龄化趋势驱动；但政策风险高，需作为卫星仓位（≤5%）配置，不可重仓。",
    "tags": ["512170", "中证医疗ETF", "老龄化主题"],
    "feeFocus": "管理费 0.5%，托管费 0.1%；场内交易注意政策变化引发的跳空风险。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "stability": 0.24,
      "risk": 0.18,
      "liquidity": 0.16,
      "horizon": 0.14,
      "contribution": 0.12,
      "pensionGap": 0.1,
      "discipline": 0.06
    }
  },
  {
    "id": "fund-13-长信可转债",
    "name": "长信基金「长信可转债债券 A」（519977）",
    "category": "fund",
    "shortType": "转",
    "price": "3%-12%",
    "riskTier": "中风险",
    "level": 2,
    "term": "3 年以上",
    "threshold": "10 元起",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "兼具债券下方保护和股票上行弹性，作为养老组合中「攻守兼备」的过渡层工具。",
    "suitable": "适合中等风险承受、希望在纯债和股票之间寻找收益弹性的人群。",
    "caution": "可转债市场流动性和估值受正股及信用风险双重影响，低价高溢价时期性价比下降。",
    "summary": "长信可转债（519977）是国内运作时间较长的可转债主动基金，基金经理主要通过个券筛选控制回撤，历史年化约 6%-10%，最大回撤约 15%-20%，适合在股债平衡策略中充当弹性过渡角色。",
    "tags": ["519977", "长信可转债", "攻守兼备"],
    "feeFocus": "管理费 1.0%；了解当前可转债估值水位（偏贵则谨慎加仓）。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "risk": 0.3,
      "horizon": 0.2,
      "contribution": 0.16,
      "discipline": 0.14,
      "pensionGap": 0.1,
      "stability": 0.06,
      "liquidity": 0.04
    }
  },
  {
    "id": "fund-14-博时黄金ETF",
    "name": "博时基金「黄金 ETF 联接 A」（002910）",
    "category": "fund",
    "shortType": "金",
    "price": "2%-8%",
    "riskTier": "中风险",
    "level": 2,
    "term": "3 年以上",
    "threshold": "10 元起",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "持有黄金资产，分散通胀、地缘风险和权益市场大幅下跌时的尾部风险。",
    "suitable": "适合已有核心股债组合、希望增加 5% 左右实物抗通胀资产的人群。",
    "caution": "黄金不产生现金流（股息/利息），长期回报主要靠价格波动；不宜超过组合 10%。",
    "summary": "博时黄金 ETF 联接 A（002910）底层持有上交所黄金 ETF，可通过场外基金渠道购买，最低 10 元；黄金与 A 股相关性低，在极端风险事件中可提供对冲保护，历史年化约 3%-8%（随国际金价周期波动）。",
    "tags": ["002910", "博时黄金", "抗通胀"],
    "feeFocus": "管理费 0.6%，托管费 0.1%；关注金价区间估值，高位不追涨。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "stability": 0.24,
      "risk": 0.18,
      "liquidity": 0.16,
      "horizon": 0.14,
      "contribution": 0.12,
      "pensionGap": 0.1,
      "discipline": 0.06
    }
  },
  {
    "id": "fund-15-华夏中证REITs",
    "name": "华夏中国交建高速 REIT（180101）",
    "category": "fund",
    "shortType": "R",
    "price": "2%-10%",
    "riskTier": "中高风险",
    "level": 3,
    "term": "5 年以上更佳",
    "threshold": "场内 100 元起",
    "liquidity": "中",
    "stage": "增强层",
    "account": "长期投资账户",
    "role": "通过高速公路基础设施资产获取稳定分红收益，增加组合另类收益来源。",
    "suitable": "适合希望在证券组合中增加类债性现金流、且对基础设施运营感兴趣的人群。",
    "caution": "国内 REITs 流动性较低，价格波动大；分红收益需缴个人所得税（20%），税后收益率需单独测算。",
    "summary": "华夏中国交建高速 REIT（180101）是国内首批基础设施 REITs 之一，底层资产为广东高速公路，历史分红收益率约 3%-5%，适合作为养老组合「另类资产」的 2%-5% 卫星仓，增加非传统资产的现金流多样性。",
    "tags": ["180101", "高速REIT", "基础设施"],
    "feeFocus": "管理费约 0.5%-1%；关注折溢价率和分红到账时间（季度分配）。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "horizon": 0.28,
      "risk": 0.24,
      "discipline": 0.18,
      "contribution": 0.14,
      "pensionGap": 0.1,
      "stability": 0.04,
      "liquidity": 0.02
    }
  },
  {
    "id": "fund-16-个人养老金Y份额",
    "name": "工银瑞信「养老目标日期 2040 五年持有 Y」（012415）",
    "category": "fund",
    "shortType": "Y类",
    "price": "5%-20%",
    "riskTier": "中风险",
    "level": 2,
    "term": "5 年持有期（个人养老金账户内）",
    "threshold": "个人养老金账户内购买",
    "liquidity": "低（至退休条件）",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "在个人养老金账户内享受 Y 份额零申购费和更低管理费优惠，同步获得税前扣除。",
    "suitable": "适合已开通个人养老金账户、希望在账户内配置权益资产以修复养老金缺口的人群。",
    "caution": "资金锁定至退休条件，不可提前取出；Y 份额只能在个人养老金账户内购买，普通账户不可购买。",
    "summary": "工银瑞信养老 2040 Y 份额（012415）是专为个人养老金账户设计的版本，申购费率 0%、管理费率比 A 类低约 0.2%，叠加最高 1.2 万元/年税前扣除优惠，是账户内权益配置性价比最高的产品之一。",
    "tags": ["012415", "Y份额", "个人养老金专属"],
    "feeFocus": "Y 份额申购费 0%，管理费约 0.4%，托管费 0.1%；关注持有期满赎回费。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "risk": 0.3,
      "horizon": 0.2,
      "contribution": 0.16,
      "discipline": 0.14,
      "pensionGap": 0.1,
      "stability": 0.06,
      "liquidity": 0.04
    }
  },
  {
    "id": "fund-17-中欧养老目标2050",
    "name": "中欧基金「养老目标日期 2050 五年持有 A」（007189）",
    "category": "fund",
    "shortType": "50",
    "price": "5%-20%",
    "riskTier": "中风险",
    "level": 2,
    "term": "5 年持有期",
    "threshold": "10 元起",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "适合 2045-2055 年退休的年轻群体，初始权益比例较高，随年份接近逐步降低风险。",
    "suitable": "适合预计 2045-2055 年退休（当前约 30-38 岁）、有强长期增长诉求的人群。",
    "caution": "5 年持有期最长，短期资金绝不适合；初始权益比例可高达 75%，回撤可能超 30%。",
    "summary": "中欧养老 2050（007189）面向最年轻的积累期投资者，初始权益上限 75%，底层通过 FOF 结构投资中欧旗下和外部基金，历史年化约 3%-8%（随市场周期大幅波动），适合 30-40 岁群体的养老核心仓。",
    "tags": ["007189", "中欧2050", "长积累期"],
    "feeFocus": "管理费 0.6%；5 年持有期内提前赎回有惩罚费率，需严格执行。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "stability": 0.24,
      "risk": 0.18,
      "liquidity": 0.16,
      "horizon": 0.14,
      "contribution": 0.12,
      "pensionGap": 0.1,
      "discipline": 0.06
    }
  },
  {
    "id": "fund-18-定投止盈计划",
    "name": "支付宝「基金投顾 · 养老稳健组合」（蚂蚁财富）",
    "category": "fund",
    "shortType": "投顾",
    "price": "3%-15%",
    "riskTier": "中高风险",
    "level": 2,
    "term": "长期滚动",
    "threshold": "800 元起",
    "liquidity": "中",
    "stage": "核心层",
    "account": "长期投资账户",
    "role": "由持牌投资顾问管理的基金组合，自动执行再平衡和止盈止损，降低追涨杀跌行为风险。",
    "suitable": "适合有养老定投意愿但容易追涨杀跌、需要行为约束和自动化执行的人群。",
    "caution": "投顾费约 0.5%/年，叠加底层基金费率，总费率约 1.3%-1.8%；止盈规则不能过于频繁，否则可能损失长期收益。",
    "summary": "蚂蚁财富基金投顾「养老稳健组合」由持牌机构（如先锋领航、华夏基金等）管理，通过目标风险约束、自动再平衡和条件止盈完成全流程执行，适合不想自己做再平衡决策但希望长期定投养老的用户，门槛 800 元起。",
    "tags": ["投顾组合", "自动再平衡", "行为管理"],
    "feeFocus": "投顾费约 0.5%/年；需查看组合持仓基金的底层费率，核算综合成本。",
    "selectionTips": "先确认持有期和回撤承受能力，再选择目标日期、目标风险或主题风格。",
    "rebalance": "每季度观察，每年再平衡；偏离目标比例 5 个百分点以上再调整。",
    "weights": {
      "stability": 0.24,
      "risk": 0.18,
      "liquidity": 0.16,
      "horizon": 0.14,
      "contribution": 0.12,
      "pensionGap": 0.1,
      "discipline": 0.06
    }
  },
  // ─── 保险 (insurance) ────────────────────────────────────────────────────
  {
    "id": "insurance-01-太平洋养老年金",
    "name": "中国太平洋人寿「金佑人生 · 养老年金」",
    "category": "insurance",
    "shortType": "年",
    "price": "10%-30%",
    "riskTier": "保障/现金流",
    "level": 3,
    "term": "长期持有，至约定领取年龄",
    "threshold": "按年缴方案，通常 5000 元/年起",
    "liquidity": "低（早期退保损失大）",
    "stage": "增强层",
    "account": "保障与现金流账户",
    "role": "将部分资产转换为未来每年/每月确定领取的现金流，解决长寿风险，作为「第三支柱个人养老金」补充。",
    "suitable": "适合临近退休（距退休 10 年内）、希望锁定退休后固定现金流、担心长寿风险的人群。",
    "caution": "早期退保现金价值低于已缴保费，需持有至领取期才能发挥价值；购买前需核对领取年龄、领取金额和保证领取年数（20 年保证领取保障性最强）。",
    "summary": "太保「金佑人生」养老年金是国内头部保司的主流养老年金产品，购买后在约定年龄（55/60/65 岁）开始每年领取固定金额，以 30 万趸交为例，60 岁起每年可领取约 1.5-2 万元（具体以条款为准），兼顾确定性收益和长寿保障。",
    "tags": ["太平洋人寿", "养老年金", "确定现金流"],
    "feeFocus": "重点核对现金价值表、保证领取期（优先选 20 年保证领取）、领取年龄和退保手续费。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.34,
      "pensionGap": 0.2,
      "stability": 0.16,
      "legacy": 0.12,
      "contribution": 0.08,
      "liquidity": 0.06,
      "risk": 0.04
    }
  },
  {
    "id": "insurance-02-中国人寿增额终身寿",
    "name": "中国人寿「鑫享未来增额终身寿险」",
    "category": "insurance",
    "shortType": "寿",
    "price": "5%-25%",
    "riskTier": "保障/长期",
    "level": 3,
    "term": "长期持有，保障至终身",
    "threshold": "按年缴方案，通常 1 万元/年起",
    "liquidity": "低（早期退保损失大，持有 10 年以上现金价值增长稳定）",
    "stage": "增强层",
    "account": "保障与现金流账户",
    "role": "以每年 3% 左右的固定复利增额，兼顾长期现金价值积累、家庭责任覆盖和财富传承安排。",
    "suitable": "适合已有基础保障、希望规划长期现金价值和家庭资产定向传承（子女/配偶）的人群。",
    "caution": "需关注实际复利增速（非演示最高值）、缴费期内的现金价值增长节奏，以及受益人指定；3 年内退保损失极大。",
    "summary": "中国人寿「鑫享未来」增额终身寿险按保额每年 3% 复利增长，属于保证收益的储蓄型保险；以 10 万/年缴费 10 年为例，20 年后现金价值约 150-180 万（具体以条款为准），可灵活减保取现或作为传承工具，是高净值群体养老 + 传承规划的主力产品。",
    "tags": ["国寿鑫享未来", "增额终身寿", "3%复利"],
    "feeFocus": "重点核对保额复利增速（是否保证 3%）、缴费期后现金价值、减保规则和受益人条款。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.44,
      "liquidity": 0.14,
      "pensionGap": 0.14,
      "legacy": 0.1,
      "stability": 0.1,
      "contribution": 0.06,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-03-百万医疗险",
    "name": "众安保险「尊享 e 生百万医疗险」（续保版）",
    "category": "insurance",
    "shortType": "医",
    "price": "建议优先核查",
    "riskTier": "保障型",
    "level": 1,
    "term": "1 年期，持续续保",
    "threshold": "按年龄，35-45 岁约 400-1200 元/年",
    "liquidity": "不适用",
    "stage": "起步层",
    "account": "保障与现金流账户",
    "role": "补齐医疗风险底座，避免大额医疗费用打断养老资金积累。",
    "suitable": "适合保障不清楚、只有社保基础医疗或家庭责任较重的人群，是养老组合的优先入口。",
    "caution": "需如实健康告知，既往症不赔；重点比较续保保证（6 年保证续保更优）、免赔额和医院范围（含社保外责任更好）。",
    "summary": "众安「尊享 e 生」百万医疗险是国内互联网医疗险的标杆产品，提供 600 万元/年的住院医疗保额，含特药清单，1 万元免赔额，35 岁男性约 400-700 元/年；可在众安 App 或支付宝健康险直接购买，适合作为养老保障组合的「医疗底座」首先配置。",
    "tags": ["尊享e生", "百万医疗", "6年续保"],
    "feeFocus": "重点核对续保保证（是否保证续保、年龄上限）、免赔额（1 万 vs 5000 元）、医院范围（限社保范围内 vs 不限）和特药清单。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "legacy": 0.34,
      "protection": 0.24,
      "stability": 0.16,
      "pensionGap": 0.12,
      "contribution": 0.08,
      "liquidity": 0.04,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-04-定期寿险",
    "name": "大都会人寿「定海柱 II 定期寿险」",
    "category": "insurance",
    "shortType": "责",
    "price": "按负债和家庭责任测算",
    "riskTier": "保障型",
    "level": 1,
    "term": "20-30 年（覆盖房贷期限）",
    "threshold": "按保额和年龄，30 岁 100 万保额约 1000-1500 元/年",
    "liquidity": "不适用",
    "stage": "起步层",
    "account": "保障与现金流账户",
    "role": "覆盖房贷、子女教育和赡养责任，防止家庭主要收入来源发生意外后养老账户被清空。",
    "suitable": "适合上有老下有小、仍有房贷或家庭收入依赖度高的人群，是保障优先原则的第一步。",
    "caution": "保额应基于「未偿债务 + 子女教育金 + 赡养父母费用」测算，而非随意选择；年龄越大保费越贵，越早投保越合算。",
    "summary": "大都会人寿「定海柱 II」是业内性价比较高的定期寿险，支持保至 60/70 岁或 30 年期，100 万保额 30 岁男性约 1000-1500 元/年，可通过经纪人或大都会官网购买；同类产品还有华贵大麦 2.0 等，建议多平台比价。",
    "tags": ["定海柱II", "定期寿险", "高杠杆保障"],
    "feeFocus": "重点核对续保保证、责任免除条款和健康告知，比较 10 年/20 年缴费期综合成本。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.34,
      "pensionGap": 0.2,
      "stability": 0.16,
      "legacy": 0.12,
      "contribution": 0.08,
      "liquidity": 0.06,
      "risk": 0.04
    }
  },
  {
    "id": "insurance-05-长期护理险",
    "name": "泰康人寿「泰康护理保险（普惠版）」",
    "category": "insurance",
    "shortType": "护",
    "price": "结合照护资源测算",
    "riskTier": "保障型",
    "level": 2,
    "term": "长期（持有至失能风险发生）",
    "threshold": "按年龄和健康状况，45 岁约 3000-6000 元/年",
    "liquidity": "不适用",
    "stage": "核心层",
    "account": "保障与现金流账户",
    "role": "覆盖失能护理风险，减少未来护理支出对养老金的冲击，是应对长寿风险的重要工具。",
    "suitable": "适合担心高龄护理成本上升、家庭照护资源有限、或家族有慢性病史的人群。",
    "caution": "重点核查失能认定标准（6 项基本日常活动）、给付条件（生存且符合失能状态）、等待期（通常 180 天）和豁免条款。",
    "summary": "泰康护理险是国内市场中商业长护险的代表产品，月给付金额可选择 2000-6000 元，给付至符合失能状态结束（或约定年龄），护理服务可与泰康之家高端养老社区权益联动；投保建议在 50 岁前完成，健康状况越早告知越好。",
    "tags": ["泰康护理险", "失能保障", "长寿风险"],
    "feeFocus": "重点核对失能定义（越宽松越好）、给付期限（终身给付优于定期）、护理服务权益覆盖城市。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.44,
      "liquidity": 0.14,
      "pensionGap": 0.14,
      "legacy": 0.1,
      "stability": 0.1,
      "contribution": 0.06,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-06-个人养老金保险",
    "name": "太平人寿「太平岁岁金生养老保险（个人养老金版）」",
    "category": "insurance",
    "shortType": "个",
    "price": "5%-20%",
    "riskTier": "保障/长期",
    "level": 2,
    "term": "至领取条件（约退休年龄）",
    "threshold": "个人养老金账户内，年缴上限 1.2 万元",
    "liquidity": "低（锁定至退休条件）",
    "stage": "核心层",
    "account": "保障与现金流账户",
    "role": "在个人养老金账户内配置保险产品，兼顾税优、确定性现金流和基础保障覆盖。",
    "suitable": "适合已开通个人养老金账户、偏好保险类确定性产品、希望将账户资金转换为退休年金的人群。",
    "caution": "需确认产品在个人养老金保险名录内（可在监管官网查询）；领取和退保规则较严，须在购买前详读合同条款。",
    "summary": "太平人寿「岁岁金生」个人养老金版专为账户投资设计，可享受税前扣除优惠，领取时按 3% 单独计税；产品提供保底利率（约 1.75%-2%）叠加浮动利率，为账户内保险类配置提供确定性保障基础。",
    "tags": ["太平岁岁金生", "个人养老金保险", "税优+年金"],
    "feeFocus": "重点核对现金价值表、退保规则、领取年龄和账户内划转规则。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "legacy": 0.34,
      "protection": 0.24,
      "stability": 0.16,
      "pensionGap": 0.12,
      "contribution": 0.08,
      "liquidity": 0.04,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-07-招商信诺高端医疗",
    "name": "招商信诺「尊贵高端医疗保险」",
    "category": "insurance",
    "shortType": "高",
    "price": "按家庭医疗预算测算",
    "riskTier": "保障型",
    "level": 3,
    "term": "1 年期，持续续保",
    "threshold": "按年龄和计划，约 5000-15000 元/年",
    "liquidity": "不适用",
    "stage": "增强层",
    "account": "保障与现金流账户",
    "role": "提高医疗资源选择权（全国顶级医院直付），大幅降低大额自费医疗对养老资产的侵蚀。",
    "suitable": "适合税后收入 30 万以上、重视就医品质、需要跨地区就医或医疗资源保障的人群。",
    "caution": "需关注既往症免责、医院范围（国内/国际）、免赔额（通常 0 免赔）和续保条件；保费随年龄递增较快。",
    "summary": "招商信诺高端医疗是国内合资险企中口碑较好的高端医疗险，提供全国直付就医、绿通服务和无免赔额的高额保障，与基础百万医疗险形成良好补充；适合已退休或临近退休、对医疗品质要求较高的人群。",
    "tags": ["招商信诺", "高端医疗", "医疗直付"],
    "feeFocus": "重点核对医院范围（是否含私立）、既往症认定、续保保证和直付合作医院清单。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.34,
      "pensionGap": 0.2,
      "stability": 0.16,
      "legacy": 0.12,
      "contribution": 0.08,
      "liquidity": 0.06,
      "risk": 0.04
    }
  },
  {
    "id": "insurance-08-平安福重疾险",
    "name": "平安人寿「平安福重大疾病保险（2024 版）」",
    "category": "insurance",
    "shortType": "疾",
    "price": "按 3-5 年收入测算",
    "riskTier": "保障型",
    "level": 2,
    "term": "20 年缴费，保至 80 岁 / 终身",
    "threshold": "按保额和年龄，30 万保额 35 岁男性约 6000-8000 元/年",
    "liquidity": "不适用",
    "stage": "核心层",
    "account": "保障与现金流账户",
    "role": "覆盖重大疾病后的收入中断和康复支出，防止因病致穷打断养老积累计划。",
    "suitable": "适合家庭收入支柱、保障缺口明显、或有家族慢性病史的人群。",
    "caution": "疾病定义按银保监标准（须关注 120 种重疾是否覆盖关键病种）、赔付次数（单次 vs 多次赔付）和等待期（通常 90 天）。",
    "summary": "平安人寿「平安福」系列是国内销售规模最大的重疾险产品之一，保障 120 种重疾 + 30 种轻症，赔付一次性给付保额，适合覆盖重疾后 3-5 年收入损失；35 岁男性 30 万保额约 6000-8000 元/年（具体以当年版本条款为准）。",
    "tags": ["平安福", "重疾险", "120种重疾"],
    "feeFocus": "重点核对重疾病种定义（冠心病手术是否需开胸）、赔付次数（含轻重疾优先）和等待期。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.44,
      "liquidity": 0.14,
      "pensionGap": 0.14,
      "legacy": 0.1,
      "stability": 0.1,
      "contribution": 0.06,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-09-意外险",
    "name": "众安保险「尊享意外险（尊享版）」",
    "category": "insurance",
    "shortType": "意",
    "price": "按保障缺口测算",
    "riskTier": "保障型",
    "level": 1,
    "term": "1 年期",
    "threshold": "约 200-500 元/年（50 万保额）",
    "liquidity": "不适用",
    "stage": "起步层",
    "account": "保障与现金流账户",
    "role": "用极低保费覆盖意外身故、伤残和医疗，避免意外事故打断养老储蓄节奏。",
    "suitable": "适合所有已建立养老计划、希望用最低成本填补意外风险缺口的人群。",
    "caution": "意外险只赔付突发性、外来性、非疾病性的事故，疾病导致的身故不赔；驾乘意外需单独核查保障范围。",
    "summary": "众安「尊享意外险」是性价比极高的 1 年期意外险，50 万意外身故/伤残保额 + 1 万意外医疗，全年约 200-500 元，适合作为保障底座的「补充基础层」，可在众安 App 或支付宝「保险」频道直接购买。",
    "tags": ["尊享意外险", "1年期", "极低保费"],
    "feeFocus": "重点核对意外医疗免赔额（0 vs 100 元）、驾乘意外覆盖和伤残比例表。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.44,
      "liquidity": 0.14,
      "pensionGap": 0.14,
      "legacy": 0.1,
      "stability": 0.1,
      "contribution": 0.06,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-10-泰康养老社区年金",
    "name": "泰康人寿「幸福有约养老年金」（含泰康之家权益）",
    "category": "insurance",
    "shortType": "社",
    "price": "10%-25%",
    "riskTier": "保障/现金流",
    "level": 3,
    "term": "长期持有，保证领取 20 年",
    "threshold": "趸交约 200 万元起（可享泰康之家入住权益）",
    "liquidity": "低",
    "stage": "增强层",
    "account": "保障与现金流账户",
    "role": "将养老年金与高端养老社区（泰康之家）入住权益绑定，解决「养老金流 + 养老服务」双重需求。",
    "suitable": "适合资产规模较大（200 万+）、同时希望锁定未来退休现金流和高端养老服务资源的人群。",
    "caution": "门槛较高；泰康之家养老社区地点有限，需提前了解服务覆盖城市和入住条件。",
    "summary": "泰康「幸福有约」养老年金将保险金融（确定年金领取）与实体养老服务（泰康之家）深度融合；购买后可优先预约高端养老公寓，退休后同时享有月度年金领取和居住服务，是国内「保险 + 养老服务」一体化的代表产品。",
    "tags": ["幸福有约", "泰康之家", "年金+社区"],
    "feeFocus": "重点核对入住条件（健康状态要求）、年金领取额和现金价值表；与单纯年金险比较综合保障价值。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "legacy": 0.34,
      "protection": 0.24,
      "stability": 0.16,
      "pensionGap": 0.12,
      "contribution": 0.08,
      "liquidity": 0.04,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-11-平安公益女性健康险",
    "name": "平安健康「安宝她健康女性重疾险」",
    "category": "insurance",
    "shortType": "她",
    "price": "按保障缺口测算",
    "riskTier": "保障型",
    "level": 1,
    "term": "20 年缴费，保至 80 岁",
    "threshold": "按健康告知，30 岁女性 20 万保额约 2500-3500 元/年",
    "liquidity": "不适用",
    "stage": "起步层",
    "account": "保障与现金流账户",
    "role": "覆盖女性特定重疾（乳腺癌、宫颈癌、卵巢癌等）、甲状腺疾病和妇产科风险。",
    "suitable": "适合希望针对女性健康风险做专项覆盖的人群，尤其是家族有女性相关疾病史者。",
    "caution": "不要重复购买与普通重疾险责任相似的产品；关注甲状腺结节既往症处理方式（部分产品可核保通过）。",
    "summary": "平安「安宝她健康」专注女性重疾，前 5 年给付保额 1.2 倍（原位癌 + 轻症轻赔），含 25 种女性特疾额外赔付，30 岁女性 20 万保额约 2500-3500 元/年，可通过平安寿险 App 或经纪人购买。",
    "tags": ["安宝她健康", "女性重疾", "乳腺宫颈"],
    "feeFocus": "重点核对女性特疾定义（甲状腺疾病是否包含）、轻重症比例和续保条款。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.44,
      "liquidity": 0.14,
      "pensionGap": 0.14,
      "legacy": 0.1,
      "stability": 0.1,
      "contribution": 0.06,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-12-父母医疗险",
    "name": "平安产险「平安父母医疗险（尊享版）」",
    "category": "insurance",
    "shortType": "亲",
    "price": "按家庭支持预算",
    "riskTier": "保障型",
    "level": 2,
    "term": "1 年期",
    "threshold": "按年龄，60-70 岁父母约 3000-8000 元/年",
    "liquidity": "不适用",
    "stage": "核心层",
    "account": "保障与现金流账户",
    "role": "为高龄父母配置医疗险，将父母医疗风险纳入家庭现金流预案，减少对自身养老计划的冲击。",
    "suitable": "适合 45-55 岁需要支持父母医疗支出、担心父母大额医疗打断自身养老积累的人群。",
    "caution": "高龄（70 岁以上）投保限制较多，审核严格；应同时准备 6-12 个月的医疗备用金垫，避免理赔等待期产生资金缺口。",
    "summary": "平安父母医疗险是国内较早推出父母医疗险的产品之一，覆盖 60-74 岁父母的住院医疗，提供 200 万保额和特药覆盖，1 万元免赔额；可通过平安金管家 App 购买，需配合父母健康告知如实填写。",
    "tags": ["父母医疗险", "平安产险", "高龄医疗"],
    "feeFocus": "重点核对年龄限制（最高投保年龄）、等待期、续保条件和医院范围。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "legacy": 0.34,
      "protection": 0.24,
      "stability": 0.16,
      "pensionGap": 0.12,
      "contribution": 0.08,
      "liquidity": 0.04,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-13-友邦保证领取年金",
    "name": "友邦人寿「御臻年金」（20 年保证领取版）",
    "category": "insurance",
    "shortType": "保",
    "price": "10%-30%",
    "riskTier": "保障/现金流",
    "level": 3,
    "term": "长期，20 年保证领取",
    "threshold": "按年缴，通常 3-5 万元/年起",
    "liquidity": "低",
    "stage": "增强层",
    "account": "保障与现金流账户",
    "role": "以 20 年保证领取期（即使提前身故家属仍继续领取）强化退休现金流的确定性，避免「少领」风险。",
    "suitable": "适合担心领取期不足或希望给家人留领取权益的人群，尤其是独生子女家庭。",
    "caution": "保证领取期越长，初始领取金额越少；需权衡「领取总额 vs 每年领取金额」；友邦属外资险企，服务费率相对较高。",
    "summary": "友邦人寿「御臻年金」20 年保证领取版，承诺自领取起前 20 年无论生死均按约定金额领取，超出部分继续领取至身故，提供最强领取确定性；友邦历史分红记录稳定，适合注重保证领取权益和传承安排的群体。",
    "tags": ["友邦御臻", "20年保证领取", "传承年金"],
    "feeFocus": "重点核对保证领取金额（vs 身故受益金）、领取开始年龄和现金价值表。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.34,
      "pensionGap": 0.2,
      "stability": 0.16,
      "legacy": 0.12,
      "contribution": 0.08,
      "liquidity": 0.06,
      "risk": 0.04
    }
  },
  {
    "id": "insurance-14-信泰递延年金",
    "name": "信泰人寿「超级玛丽递延年金」",
    "category": "insurance",
    "shortType": "延",
    "price": "5%-25%",
    "riskTier": "保障/现金流",
    "level": 3,
    "term": "递延至约定领取年龄（如 60/65 岁）",
    "threshold": "按年缴，约 5000-3 万元/年",
    "liquidity": "低",
    "stage": "增强层",
    "account": "保障与现金流账户",
    "role": "通过长期递延（积累期 15-25 年）换取退休后较高的年金领取金额，适合提早开始规划的年轻群体。",
    "suitable": "适合距离退休 10 年以上（35-50 岁）、追求确定性收益率（约 3.0%-3.5% 复利）的人群。",
    "caution": "递延期较长，流动性极低；信泰为中型险企，需关注偿付能力评级（不低于 A 级较为安全）。",
    "summary": "信泰「超级玛丽」递延年金提供 3.0%-3.5% 复利的长期积累（具体以合同计划书为准），30 年积累后领取效果显著；价格相比大型险企更具竞争力，适合高边际税率的中年群体利用递延期实现资产的保值增值。",
    "tags": ["信泰递延年金", "长期递延", "3%复利"],
    "feeFocus": "重点核对现金价值进度（前 5 年损失最大）、领取计划表和退保手续费；信泰偿付能力评级需定期关注。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.44,
      "liquidity": 0.14,
      "pensionGap": 0.14,
      "legacy": 0.1,
      "stability": 0.1,
      "contribution": 0.06,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-15-保单贷款备用",
    "name": "保单「减保取现 / 保单贷款」功能（适用于已有终身寿险）",
    "category": "insurance",
    "shortType": "贷",
    "price": "作为附加功能",
    "riskTier": "保障/流动性",
    "level": 3,
    "term": "随保单规则，贷款期通常 1 年",
    "threshold": "需已有具备现金价值的终身寿险或年金险",
    "liquidity": "中",
    "stage": "增强层",
    "account": "保障与现金流账户",
    "role": "在持有增额终身寿险或年金险的基础上，利用现金价值作为应急借款通道，不影响保险保障。",
    "suitable": "适合已持有现金价值型保单（增额寿、年金险）且担心短期资金周转的人群。",
    "caution": "保单贷款利率通常年化 5%-7%（高于同期存款），产生利息会影响现金价值净增长；贷款未还清时身故，理赔额也会被扣除。",
    "summary": "大多数人寿险保单均附有「保单贷款」功能，可按现金价值的 80% 申请借款，到账快（1-3 工作日），利率年化 5%-7%，适合临时资金周转（如子女教育、医疗急用），无需赎回长期保单；各险企支持在 App 内自助办理。",
    "tags": ["保单贷款", "现金价值", "应急借款"],
    "feeFocus": "重点核对贷款利率（年化 5%-7%）、最长贷款期限和未还款对保单效力的影响。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "legacy": 0.34,
      "protection": 0.24,
      "stability": 0.16,
      "pensionGap": 0.12,
      "contribution": 0.08,
      "liquidity": 0.04,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-16-传承受益人规划",
    "name": "中信保诚「传世增额终身寿险」（受益人定向传承版）",
    "category": "insurance",
    "shortType": "传",
    "price": "按资产规模测算",
    "riskTier": "保障/传承",
    "level": 3,
    "term": "终身",
    "threshold": "按保单结构，趸缴 50 万以上",
    "liquidity": "低",
    "stage": "增强层",
    "account": "保障与现金流账户",
    "role": "通过明确受益人指定实现家庭资产的定向传递，绕过遗产继承的复杂程序和潜在纠纷。",
    "suitable": "适合有明确传承目标、家庭结构较复杂或财富保全需求较强的高净值人群。",
    "caution": "需定期更新受益人（如离婚、子女变更等），并建议配合遗嘱和法律安排；保险金不计入遗产但债务追偿情形复杂，需专业顾问评估。",
    "summary": "中信保诚「传世」增额终身寿险是面向传承需求设计的保险产品，通过保险合同的受益人条款实现定向财富传递；叠加 3% 左右复利增长，既可作为传承资产增值工具，也可在家庭财务规划中发挥不可分割的财富保护功能。",
    "tags": ["传世增额寿", "受益人传承", "中信保诚"],
    "feeFocus": "重点核对现金价值增速、受益人条款和保险金是否可免于强制执行（香港险企差异较大）。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。增强层产品应控制比例，避免单一产品影响整体组合。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.34,
      "pensionGap": 0.2,
      "stability": 0.16,
      "legacy": 0.12,
      "contribution": 0.08,
      "liquidity": 0.06,
      "risk": 0.04
    }
  },
  {
    "id": "insurance-17-平安养老社区权益",
    "name": "平安人寿「御享世家养老保险」（含颐年社区权益）",
    "category": "insurance",
    "shortType": "颐",
    "price": "按服务需求测算",
    "riskTier": "保障/服务型",
    "level": 2,
    "term": "长期",
    "threshold": "趸交约 100 万以上（含社区权益）",
    "liquidity": "低",
    "stage": "核心层",
    "account": "保障与现金流账户",
    "role": "将年金保险与平安颐年城（高端养老社区）入住权益结合，为退休后的居住安排和现金流双重锁定。",
    "suitable": "适合担心未来照护资源获取困难、资产规模在 100-300 万区间的城市中产家庭。",
    "caution": "养老社区地点覆盖城市有限，需确认所在城市是否有平安颐年城；服务权益与保险金分开，需看清合同中权益兑换条件。",
    "summary": "平安「御享世家」将养老保险与颐年城居住权益深度绑定，被保险人达到约定年龄后，可优先入住平安颐年城高端养老社区，同时享有年金领取；适合提前锁定「老有所居、老有所养」双重安排的高净值家庭。",
    "tags": ["御享世家", "平安颐年城", "保险+居住"],
    "feeFocus": "重点核对居住权益城市覆盖、服务费标准和年金领取与入住服务的资金独立性。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "protection": 0.44,
      "liquidity": 0.14,
      "pensionGap": 0.14,
      "legacy": 0.1,
      "stability": 0.1,
      "contribution": 0.06,
      "risk": 0.02
    }
  },
  {
    "id": "insurance-18-保单体检服务",
    "name": "i 云保 /「慧择保险」保单整理体检服务",
    "category": "insurance",
    "shortType": "检",
    "price": "建议优先核查",
    "riskTier": "服务型",
    "level": 1,
    "term": "一次性 / 年度更新",
    "threshold": "免费（慧择）或 199-499 元（i 云保会员）",
    "liquidity": "不适用",
    "stage": "起步层",
    "account": "保障与现金流账户",
    "role": "梳理现有保单的保障责任、缺口、重复投保和缴费压力，形成「保单体检报告」后再决定新增或调整。",
    "suitable": "适合保障不清楚、买过多张保单但不知道是否够用、或准备优化保险层的人群。",
    "caution": "体检报告显示缺口后不一定需要立即购买新保险；服务方可能有推销新产品的商业动机，建议多方比较。",
    "summary": "i 云保和慧择是国内主流保险经纪平台，提供免费或低价的「保单汇总 + 保障分析」服务：上传保单后自动识别保障责任、重复责任和缺口，生成可视化保单图谱；养老规划前建议先完成一次保单体检，了解当前保障底座。",
    "tags": ["保单体检", "i云保", "慧择"],
    "feeFocus": "重点核对体检报告的保障覆盖维度（医疗/重疾/寿险/护理/意外各类）和推荐产品的利益冲突声明。",
    "selectionTips": "先做保障缺口和现金流测算，再比较保额、领取和退保规则。",
    "rebalance": "每年复查缴费压力、受益人和保障缺口，重大家庭变化后及时更新。",
    "weights": {
      "legacy": 0.34,
      "protection": 0.24,
      "stability": 0.16,
      "pensionGap": 0.12,
      "contribution": 0.08,
      "liquidity": 0.04,
      "risk": 0.02
    }
  }
];

const scenarioPlaybooks = [
  {
    "id": "late-start",
    "title": "起步较晚但现金流稳定",
    "triggerAxes": [
      "pensionGap",
      "stability",
      "contribution"
    ],
    "summary": "重点不是追高收益，而是提高月度投入、锁定稳定底仓，再用少量增长资产修复缺口。",
    "moves": [
      "把月投入提高到收入的 10%-15%",
      "建立 6 个月现金垫",
      "使用固收+和年金承接临退现金流"
    ],
    "redFlags": [
      "一次性重仓权益基金",
      "购买高缴费长期产品导致现金流紧张",
      "忽略健康保障"
    ],
    "metrics": [
      "月投入率",
      "现金垫月数",
      "退休前 5 年权益占比"
    ]
  },
  {
    "id": "young-growth",
    "title": "距离退休较远且能承受波动",
    "triggerAxes": [
      "horizon",
      "risk",
      "discipline"
    ],
    "summary": "长期定投是核心，储蓄和保险用于防守，基金负责主要增长。",
    "moves": [
      "建立目标日期或指数定投",
      "设置年度再平衡",
      "用储蓄账户隔离应急金"
    ],
    "redFlags": [
      "频繁止盈止损",
      "主题基金比例过高",
      "没有保障底座"
    ],
    "metrics": [
      "定投连续月数",
      "最大回撤承受范围",
      "权益资产比例"
    ]
  },
  {
    "id": "family-protection",
    "title": "家庭责任较重",
    "triggerAxes": [
      "protection",
      "liquidity",
      "legacy"
    ],
    "summary": "先保护家庭现金流，再谈长期收益；保障不足会让养老账户在风险事件中被动清空。",
    "moves": [
      "做保单体检",
      "补齐医疗、寿险和护理责任",
      "建立家庭共同养老账户"
    ],
    "redFlags": [
      "只买收益型产品",
      "保额不足",
      "高缴费保险压缩日常现金流"
    ],
    "metrics": [
      "保障缺口",
      "保费收入比",
      "家庭应急金月数"
    ]
  },
  {
    "id": "near-retirement",
    "title": "5 年内退休或半退休",
    "triggerAxes": [
      "stability",
      "liquidity",
      "pensionGap"
    ],
    "summary": "核心是把资产从积累期切换到领取期，提前准备退休前 3 年支出储备。",
    "moves": [
      "建立领取备用账户",
      "降低高波动基金比例",
      "测算社保与年金领取时间"
    ],
    "redFlags": [
      "临退前追求高收益",
      "忽略封闭期",
      "没有月度现金流表"
    ],
    "metrics": [
      "首 3 年支出覆盖率",
      "低波资产比例",
      "领取来源数量"
    ]
  }
];


const defaultScores = Object.keys(axes).reduce((acc, key) => {
  acc[key] = 16;
  return acc;
}, {});

const categoryOrder = ["savings", "wealth", "fund", "insurance"];
const storageKey = "retirementPlannerAnswersV3";

const state = {
  current: 0,
  answers: loadAnswers(),
  tab: "assessment"
};

const elements = {
  tabs: Array.from(document.querySelectorAll(".tab")),
  views: Array.from(document.querySelectorAll(".view-pane")),
  sectionName: document.querySelector("#sectionName"),
  questionTitle: document.querySelector("#questionTitle"),
  questionHint: document.querySelector("#questionHint"),
  optionsGrid: document.querySelector("#optionsGrid"),
  progressLabel: document.querySelector("#progressLabel"),
  progressBar: document.querySelector("#progressBar"),
  prevBtn: document.querySelector("#prevBtn"),
  nextBtn: document.querySelector("#nextBtn"),
  resetBtn: document.querySelector("#resetBtn"),
  profileTitle: document.querySelector("#profileTitle"),
  typeCode: document.querySelector("#typeCode"),
  packageTitle: document.querySelector("#packageTitle"),
  packageSummary: document.querySelector("#packageSummary"),
  costBand: document.querySelector("#costBand"),
  packageStack: document.querySelector("#packageStack"),
  axisList: document.querySelector("#axisList"),
  reasonList: document.querySelector("#reasonList"),
  actionPlan: document.querySelector("#actionPlan"),
  snapshotTitle: document.querySelector("#snapshotTitle"),
  snapshotCopy: document.querySelector("#snapshotCopy"),
  answeredCount: document.querySelector("#answeredCount"),
  topNeed: document.querySelector("#topNeed"),
  budgetSignal: document.querySelector("#budgetSignal"),
  livePicks: document.querySelector("#livePicks"),
  catalogFilter: document.querySelector("#catalogFilter"),
  catalogGrid: document.querySelector("#catalogGrid"),
  canvas: document.querySelector("#careCanvas"),
  readinessBadge: document.querySelector("#readinessBadge"),
  allocationPreview: document.querySelector("#allocationPreview"),
  insightSignals: document.querySelector("#insightSignals")
};

function loadAnswers() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

function saveAnswers() {
  localStorage.setItem(storageKey, JSON.stringify(state.answers));
}

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getAnsweredCount() {
  return Object.keys(state.answers).filter((id) => questions.some((question) => question.id === id)).length;
}

function getMode(values) {
  const counts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
}

function calculateProfile() {
  const totals = { ...defaultScores };
  const preferences = [];
  let capacityLevel = 2;
  let monthlyRange = "500-2000 元/月";

  questions.forEach((question) => {
    const selectedIndex = state.answers[question.id];
    const option = question.options[selectedIndex];
    if (!option) return;

    Object.entries(option.weights).forEach(([axis, value]) => {
      totals[axis] = (totals[axis] || 0) + value;
    });

    if (option.preference) preferences.push(option.preference);
    if (option.capacityLevel) capacityLevel = option.capacityLevel;
    if (option.monthlyRange) monthlyRange = option.monthlyRange;
  });

  const answered = getAnsweredCount();
  const scores = {};
  Object.keys(axes).forEach((axis) => {
    const completionLift = answered ? 0 : -6;
    scores[axis] = clamp(18 + totals[axis] / 3.35 + completionLift);
  });

  const preference = getMode(preferences) || "wealth";
  const allocation = calculateAllocation(scores, preference);
  const profileType = createProfileType(scores, preference);
  const recommendations = scoreProducts(scores, preference, capacityLevel);
  const topNeeds = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const readiness = calculateReadiness(scores, answered);
  const stagePlan = buildStagePlan(scores, allocation);
  const scenarioMatches = matchScenarios(scores);

  return {
    scores,
    preference,
    capacityLevel,
    monthlyRange,
    allocation,
    profileType,
    recommendations,
    topNeeds,
    answered,
    readiness,
    stagePlan,
    scenarioMatches,
    complete: answered === questions.length
  };
}

function calculateReadiness(scores, answered) {
  const completion = answered / questions.length;
  const stability = (scores.stability + scores.liquidity + scores.discipline) / 3;
  const gapPenalty = Math.max(0, scores.pensionGap - 62) * 0.2;
  const protectionPenalty = Math.max(0, scores.protection - 68) * 0.12;
  return clamp(completion * 42 + stability * 0.56 - gapPenalty - protectionPenalty);
}

function calculateAllocation(scores, preference) {
  const allocation = {
    savings: 25,
    wealth: 25,
    fund: 25,
    insurance: 25
  };

  const shift = (category, value) => {
    allocation[category] += value;
  };

  if (scores.horizon > 64 && scores.risk > 50) {
    shift("fund", 12);
    shift("savings", -5);
    shift("insurance", -4);
    shift("wealth", -3);
  }

  if (scores.horizon < 42) {
    shift("savings", 10);
    shift("insurance", 8);
    shift("fund", -12);
    shift("wealth", -6);
  }

  if (scores.liquidity > 62) {
    shift("savings", 12);
    shift("fund", -6);
    shift("wealth", -4);
    shift("insurance", -2);
  }

  if (scores.protection > 58) {
    shift("insurance", 14);
    shift("fund", -5);
    shift("wealth", -5);
    shift("savings", -4);
  }

  if (scores.legacy > 62) {
    shift("insurance", 8);
    shift("wealth", 4);
    shift("fund", -6);
    shift("savings", -6);
  }

  if (scores.risk > 68 && scores.discipline > 54) {
    shift("fund", 14);
    shift("wealth", 4);
    shift("savings", -8);
    shift("insurance", -10);
  }

  if (scores.stability > 64 && scores.risk < 48) {
    shift("wealth", 10);
    shift("savings", 6);
    shift("fund", -10);
    shift("insurance", -6);
  }

  if (scores.contribution < 42) {
    shift("savings", 6);
    shift("insurance", 5);
    shift("fund", -7);
    shift("wealth", -4);
  }

  if (preference && allocation[preference] !== undefined) {
    shift(preference, 8);
    Object.keys(allocation).forEach((category) => {
      if (category !== preference) allocation[category] -= 8 / 3;
    });
  }

  Object.keys(allocation).forEach((category) => {
    allocation[category] = Math.max(7, Math.min(52, allocation[category]));
  });

  const total = Object.values(allocation).reduce((sum, value) => sum + value, 0);
  const normalized = {};
  let used = 0;
  categoryOrder.forEach((category, index) => {
    if (index === categoryOrder.length - 1) {
      normalized[category] = 100 - used;
    } else {
      normalized[category] = Math.round((allocation[category] / total) * 100);
      used += normalized[category];
    }
  });

  return normalized;
}

function createProfileType(scores, preference) {
  const horizonCode = scores.horizon >= 62 ? "LT" : scores.horizon >= 42 ? "MT" : "NT";
  const styleCode = scores.risk >= 64 && scores.discipline >= 48 ? "G" : scores.stability >= 62 || scores.liquidity >= 62 ? "S" : "B";
  const protectionCode = scores.protection >= 58 || scores.pensionGap >= 62 ? "P+" : "P0";
  const legacyCode = scores.legacy >= 58 ? "L+" : "L0";

  const horizonText = {
    LT: "长期积累",
    MT: "中程稳健",
    NT: "临退锁定"
  }[horizonCode];

  const styleText = {
    G: "增长增强",
    B: "均衡配置",
    S: "稳健保全"
  }[styleCode];

  const protectionText = protectionCode === "P+" ? "保障补强" : "基础保障";
  const legacyText = legacyCode === "L+" ? "兼顾传承" : "自用优先";
  const preferenceText = categoryNames[preference] || "均衡";

  return {
    code: `${horizonCode}-${styleCode}-${protectionCode}-${legacyCode}`,
    title: `${horizonText} · ${styleText}`,
    copy: `以${preferenceText}为偏好入口，采用${protectionText}和${legacyText}的四类产品分层配置。`
  };
}

function scoreProducts(scores, preference, capacityLevel) {
  return productCatalog
    .map((product) => {
      const needScore = Object.entries(product.weights).reduce((sum, [axis, weight]) => {
        return sum + (scores[axis] || 0) * weight;
      }, 0);

      const preferenceBoost = product.category === preference ? 10 : 0;
      const capacityPenalty = Math.max(0, product.level - capacityLevel) * 5.5;
      const riskPenalty = product.category === "fund" && scores.risk < 34 ? 10 : 0;
      const shortHorizonPenalty = product.category === "fund" && scores.horizon < 34 ? 8 : 0;
      const disciplinePenalty = product.category === "fund" && scores.discipline < 34 ? 7 : 0;
      const protectionBoost = product.category === "insurance" && scores.protection > 60 ? 8 : 0;
      const legacyBoost = product.category === "insurance" && scores.legacy > 60 ? 5 : 0;
      const liquidityBoost = product.category === "savings" && scores.liquidity > 60 ? 7 : 0;
      const stabilityBoost = product.category === "wealth" && scores.stability > 58 ? 5 : 0;

      return {
        ...product,
        match: clamp(needScore + preferenceBoost + protectionBoost + legacyBoost + liquidityBoost + stabilityBoost - capacityPenalty - riskPenalty - shortHorizonPenalty - disciplinePenalty)
      };
    })
    .sort((a, b) => b.match - a.match);
}

function matchScenarios(scores) {
  return scenarioPlaybooks
    .map((scenario) => {
      const score = scenario.triggerAxes.reduce((sum, axis) => sum + (scores[axis] || 0), 0) / scenario.triggerAxes.length;
      return { ...scenario, score: clamp(score) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);
}

function buildStagePlan(scores, allocation) {
  const stageOne = {
    title: "第 1 层：先稳住现金流",
    allocation: allocation.savings + "%",
    focus: scores.liquidity > 60 ? "补足现金垫和短周期资金" : "建立专项养老账户和自动划转",
    actions: ["分离日常账户和养老账户", "设置发薪日自动转入", "保留 6-12 个月家庭支出"]
  };

  const stageTwo = {
    title: "第 2 层：建立稳健增值层",
    allocation: allocation.wealth + "%",
    focus: scores.stability > 60 ? "用固收和多资产承接中短期资金" : "用低波动理财过渡，避免封闭期错配",
    actions: ["按 6 个月、1 年、3 年分层", "到期前复盘续作", "避免只按历史收益排序"]
  };

  const stageThree = {
    title: "第 3 层：修复长期养老金缺口",
    allocation: allocation.fund + "%",
    focus: scores.horizon > 58 ? "用定投和目标日期策略承接长期增长" : "控制权益比例并分批建仓",
    actions: ["设定定投日", "年度再平衡", "用目标风险约束回撤"]
  };

  const stageFour = {
    title: "第 4 层：补齐保障与领取",
    allocation: allocation.insurance + "%",
    focus: scores.protection > 58 ? "先做保单体检和保障补强" : "用年金或长期现金流产品增强确定性",
    actions: ["核查医疗、重疾、寿险、护理", "测算保费收入比", "确认领取年龄和退保成本"]
  };

  return [stageOne, stageTwo, stageThree, stageFour];
}

function getPackage(profile) {
  const categories = [...categoryOrder].sort((a, b) => profile.allocation[b] - profile.allocation[a]);
  const items = categories.map((category) => {
    const primary = profile.recommendations.find((item) => item.category === category);
    const alternatives = profile.recommendations.filter((item) => item.category === category && item.id !== primary.id).slice(0, 3);
    return {
      ...primary,
      allocation: profile.allocation[category],
      alternatives
    };
  });

  return {
    title: `${profile.profileType.title}四类养老组合`,
    summary: buildPackageSummary(profile, items),
    cost: `建议月投入：${profile.monthlyRange} · ${productCatalog.length} 个产品中筛选 · 每年复盘`,
    items
  };
}

function buildPackageSummary(profile, packageItems) {
  const topAxisLabels = profile.topNeeds.map(([axis]) => axes[axis]).join("、");
  const categoryText = packageItems.map((item) => `${categoryNames[item.category]} ${item.allocation}%`).join("，");
  return `当前画像优先关注${topAxisLabels}。建议先按 ${categoryText} 搭建基础组合，再结合真实风险测评、产品费率、家庭现金流和监管适当性要求微调。`;
}

function productFacts(product) {
  return [
    ["建议配置", product.price],
    ["期限", product.term],
    ["门槛", product.threshold],
    ["流动性", product.liquidity]
  ];
}

function renderFactGrid(product, isCompact = false) {
  return `
    <dl class="detail-grid${isCompact ? " is-compact" : ""}">
      ${productFacts(product)
        .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
        .join("")}
    </dl>
  `;
}

function renderProductTags(product) {
  return product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
}

function formatLiquidity(product) {
  return product.liquidity === "不适用" ? "流动性不适用" : `${product.liquidity}流动性`;
}

function renderQuestion() {
  const question = questions[state.current];
  const selectedIndex = state.answers[question.id];

  elements.sectionName.textContent = question.section;
  elements.questionTitle.textContent = question.title;
  elements.questionHint.textContent = question.hint;
  elements.progressLabel.textContent = `${state.current + 1} / ${questions.length}`;
  elements.progressBar.style.width = `${((state.current + 1) / questions.length) * 100}%`;
  elements.prevBtn.disabled = state.current === 0;
  elements.nextBtn.innerHTML =
    state.current === questions.length - 1
      ? '生成方案 <span aria-hidden="true">→</span>'
      : '下一题 <span aria-hidden="true">→</span>';

  elements.optionsGrid.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `option-card${selectedIndex === index ? " is-selected" : ""}`;
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", selectedIndex === index ? "true" : "false");
    button.innerHTML = `<strong>${option.label}</strong><span>${option.detail}</span>`;
    button.addEventListener("click", () => {
      state.answers[question.id] = index;
      saveAnswers();
      render();
    });
    elements.optionsGrid.appendChild(button);
  });
}

function renderResult(profile) {
  const packageData = getPackage(profile);

  elements.profileTitle.textContent = profile.complete ? profile.profileType.title : `${profile.profileType.title}（测评中）`;
  elements.typeCode.textContent = profile.profileType.code;
  elements.packageTitle.textContent = packageData.title;
  elements.packageSummary.textContent = packageData.summary;
  elements.costBand.textContent = packageData.cost;

  elements.packageStack.innerHTML = `
    <div class="allocation-board">
      ${categoryOrder.map((category) => renderAllocationCard(category, profile)).join("")}
    </div>
    <div class="plan-stage-grid">
      ${profile.stagePlan.map((stage) => renderStageCard(stage)).join("")}
    </div>
    ${packageData.items.map((product) => renderPackageProduct(product)).join("")}
  `;

  elements.axisList.innerHTML = Object.entries(profile.scores)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([axis, value]) => `
        <div class="axis-row">
          <header><span>${axes[axis]}</span><span>${value}</span></header>
          <div class="axis-bar"><span style="width: ${value}%; background: ${axisColors[axis]}"></span></div>
        </div>
      `
    )
    .join("");

  elements.reasonList.innerHTML = [
    ...buildReasons(profile).map((reason) => `<div class="reason-item">${reason}</div>`),
    ...profile.scenarioMatches.map(renderScenarioCard)
  ].join("");

  elements.actionPlan.innerHTML = buildActionPlan(profile)
    .map((step) => `<li>${step}</li>`)
    .join("");
}

function renderAllocationCard(category, profile) {
  const guide = categoryGuides[category];
  const topProduct = profile.recommendations.find((item) => item.category === category);
  return `
    <article class="allocation-card">
      <header>
        <span>${categoryNames[category]}</span>
        <strong>${profile.allocation[category]}%</strong>
      </header>
      <div class="mini-track"><span style="width:${profile.allocation[category]}%; background:${categoryColor(category)}"></span></div>
      <p>${guide.position}</p>
      <small>优先产品：${topProduct.name}</small>
    </article>
  `;
}

function renderStageCard(stage) {
  return `
    <article class="stage-card">
      <header>
        <strong>${stage.title}</strong>
        <span>${stage.allocation}</span>
      </header>
      <p>${stage.focus}</p>
      <ul>${stage.actions.map((action) => `<li>${action}</li>`).join("")}</ul>
    </article>
  `;
}

function renderPackageProduct(product) {
  return `
    <article class="package-item">
      <span class="package-icon" aria-hidden="true">${product.shortType}</span>
      <div>
        <strong>${categoryNames[product.category]} ${product.allocation}% · ${product.name}</strong>
        <span>${product.riskTier} · 匹配度 ${product.match} · ${product.summary}</span>
        ${renderFactGrid(product, true)}
        <p class="product-role">${product.role}</p>
        <p class="product-caution">注意：${product.caution}</p>
        <div class="alternative-row">
          <span>同类备选</span>
          ${product.alternatives.map((item) => `<b>${item.name}</b>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderScenarioCard(scenario) {
  return `
    <div class="scenario-card">
      <header><strong>${scenario.title}</strong><span>${scenario.score}</span></header>
      <p>${scenario.summary}</p>
      <ul>${scenario.moves.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function buildReasons(profile) {
  const reasonMap = {
    horizon: "退休期限越长，越适合用基金定投和目标日期产品承接长期增长；期限越短，则应逐步提高确定性资产。",
    contribution: "储备能力越强，越能做多账户配置；储备能力较弱时，应先建立自动月投和低门槛组合。",
    risk: "风险承受越高，基金类产品可承担更多增长任务；风险承受较低时，应控制权益波动。",
    stability: "收入稳定性越高，越适合长期投入和封闭期限产品；稳定性不足时，应保留更多灵活资金。",
    liquidity: "流动性需求较高，储蓄和现金管理垫应更靠前，避免养老资金被短期开支打断。",
    protection: "保障缺口明显时，保险类产品不是附加项，而是保护养老账户不被风险击穿的底座。",
    pensionGap: "养老金缺口越高，越需要提高投入率、延长积累期或引入更高长期收益弹性的产品。",
    discipline: "执行纪律越强，越能使用定投、再平衡和目标日期工具；纪律不足时应提高自动化程度。",
    legacy: "家庭传承需求越高，越需要关注保险架构、受益人安排和长期现金价值。"
  };

  const reasons = profile.topNeeds.map(([axis, value]) => `${axes[axis]} ${value} 分：${reasonMap[axis]}`);

  if (profile.scores.horizon < 38) {
    reasons.push("距离退休较近，建议减少高波动产品的一次性投入，用分批配置和到期资金承接降低择时风险。");
  }

  if (profile.scores.discipline < 42) {
    reasons.push("执行纪律分数偏低，建议优先使用自动扣款、封闭期限和年度复盘提醒，减少临场决策。");
  }

  reasons.unshift("提示：当前结果用于养老规划演示和产品组合启发，不构成具体投资建议；正式购买前仍需完成风险测评和适当性校验。");

  if (!profile.complete) {
    reasons.unshift(`已完成 ${profile.answered}/${questions.length} 题，当前结果会随答案继续校准。`);
  }

  return reasons;
}

function buildActionPlan(profile) {
  const steps = [];
  const topAxes = profile.topNeeds.map(([axis]) => axis);

  steps.push("列出社保、企业年金、个人养老金、存款、基金、保险等现有养老资产。");
  steps.push("测算退休后每月目标支出，并估算社保养老金与目标之间的缺口。");

  if (topAxes.includes("liquidity")) {
    steps.push("先补足 6-12 个月家庭应急金，再把养老资金转入专项账户。");
  }
  if (topAxes.includes("protection")) {
    steps.push("做一次保单体检，确认医疗、重疾、寿险和养老年金是否覆盖核心风险。");
  }
  if (topAxes.includes("risk")) {
    steps.push("确定最大可承受回撤，并把基金投入拆成定投和分批买入。");
  }
  if (topAxes.includes("pensionGap") || topAxes.includes("contribution")) {
    steps.push("设置自动月投金额，至少连续执行 3 个月后再调整比例。");
  }
  if (topAxes.includes("discipline")) {
    steps.push("把复盘频率、止盈/再平衡规则写下来，避免临时凭情绪操作。");
  }
  if (topAxes.includes("legacy")) {
    steps.push("梳理家庭资产、受益人和共同决策人，确认传承目标是否需要保险配合。");
  }

  steps.push("每年固定复盘一次配置比例、产品费率、收益表现和家庭现金流变化。");
  return steps.slice(0, 7);
}

function renderSnapshot(profile) {
  const topNeed = profile.topNeeds[0];
  const picks = profile.recommendations.slice(0, 4);

  elements.snapshotTitle.textContent = profile.answered ? profile.profileType.title : "未完成测评";
  elements.snapshotCopy.textContent = profile.answered
    ? profile.profileType.copy
    : "选择答案后，右侧会同步出现退休期限、储备能力、保障缺口与产品组合倾向。";
  elements.answeredCount.textContent = `${profile.answered}/${questions.length}`;
  elements.topNeed.textContent = topNeed ? axes[topNeed[0]] : "--";
  elements.budgetSignal.textContent = getContributionSignal(profile.scores.contribution);

  renderReadiness(profile);
  renderAllocationPreview(profile);
  renderInsightSignals(profile);

  elements.livePicks.innerHTML = picks
    .map(
      (product, index) => `
        <article class="live-pick">
          <span class="pick-rank">${index + 1}</span>
          <div>
            <strong>${product.name}</strong>
            <span>${categoryNames[product.category]} · 匹配度 ${product.match} · ${product.price}</span>
            <small>${product.riskTier} · ${formatLiquidity(product)}</small>
          </div>
        </article>
      `
    )
    .join("");
}

function renderReadiness(profile) {
  elements.readinessBadge.innerHTML = `
    <span>画像完整度</span>
    <strong>${profile.readiness}%</strong>
  `;
}

function renderAllocationPreview(profile) {
  elements.allocationPreview.innerHTML = `
    <span class="panel-kicker">实时配置</span>
    <div class="allocation-strip">
      ${categoryOrder.map((category) => `<i style="width:${profile.allocation[category]}%; background:${categoryColor(category)}" title="${categoryNames[category]} ${profile.allocation[category]}%"></i>`).join("")}
    </div>
    <div class="allocation-mini-grid">
      ${categoryOrder.map((category) => `
        <div>
          <strong>${profile.allocation[category]}%</strong>
          <span>${categoryNames[category]}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderInsightSignals(profile) {
  const signals = buildSignals(profile);
  elements.insightSignals.innerHTML = `
    <span class="panel-kicker">实时信号</span>
    ${signals.map((signal) => `
      <article class="signal-card is-${signal.tone}">
        <strong>${signal.title}</strong>
        <span>${signal.copy}</span>
      </article>
    `).join("")}
  `;
}

function buildSignals(profile) {
  const signals = [];
  if (profile.scores.pensionGap > 62) {
    signals.push({ tone: "warn", title: "缺口压力偏高", copy: "提高月投入或延长积累期，比追求单一高收益更重要。" });
  }
  if (profile.scores.liquidity > 62) {
    signals.push({ tone: "safe", title: "流动性优先", copy: "先补现金垫，再逐步进入封闭期或长期产品。" });
  }
  if (profile.scores.risk > 62 && profile.scores.discipline > 52) {
    signals.push({ tone: "growth", title: "可承接长期增长", copy: "目标日期、指数定投和再平衡规则会更适配。" });
  }
  if (profile.scores.protection > 58) {
    signals.push({ tone: "protect", title: "保障需要先补", copy: "保单体检、医疗和家庭责任保障应进入第一阶段。" });
  }
  if (!signals.length) {
    signals.push({ tone: "safe", title: "结构较均衡", copy: "先按四类比例小额试运行，再用复盘校准。" });
  }
  return signals.slice(0, 3);
}

function getContributionSignal(value) {
  if (value >= 68) return "强";
  if (value >= 45) return "中";
  return "起步";
}

function renderCatalog() {
  const filter = elements.catalogFilter.value;
  const products = filter === "all" ? productCatalog : productCatalog.filter((product) => product.category === filter);
  const title = filter === "all" ? "全部产品" : categoryLabel(filter);

  elements.catalogGrid.innerHTML = `
    <section class="catalog-summary">
      <strong>${title} · ${products.length} 个产品</strong>
      <span>产品为养老规划演示货架，正式销售前需接入真实产品、风险测评、适当性校验和合规披露。</span>
    </section>
    ${products.map(renderCatalogProduct).join("")}
  `;
}

function renderCatalogProduct(product) {
  return `
    <article class="product-card">
      <header>
        <div>
          <span class="product-category">${categoryLabel(product.category)} · ${product.stage}</span>
          <strong>${product.name}</strong>
        </div>
        <span class="match-pill">${product.riskTier}</span>
      </header>
      <div class="tag-row">
        ${renderProductTags(product)}
      </div>
      <p>${product.summary}</p>
      ${renderFactGrid(product)}
      <div class="product-section">
        <span>组合角色</span>
        <p>${product.role}</p>
      </div>
      <div class="product-section">
        <span>适合人群</span>
        <p>${product.suitable}</p>
      </div>
      <div class="product-section">
        <span>筛选重点</span>
        <p>${product.selectionTips}</p>
      </div>
      <div class="product-section">
        <span>费用/条款</span>
        <p>${product.feeFocus}</p>
      </div>
      <div class="product-section is-warning">
        <span>注意事项</span>
        <p>${product.caution}</p>
      </div>
    </article>
  `;
}

function categoryLabel(category) {
  return categoryNames[category];
}

function categoryColor(category) {
  return {
    savings: "#0f766e",
    wealth: "#315bdc",
    fund: "#cf5d3f",
    insurance: "#b97813"
  }[category] || "#60706c";
}

function renderCanvas(profile) {
  const canvas = elements.canvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2 + 8;

  ctx.clearRect(0, 0, width, height);
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#102724");
  gradient.addColorStop(1, "#183f3a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let x = 28; x < width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 26; y < height; y += 44) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const nodes = Object.keys(axes).map((key, index, list) => ({
    key,
    label: axes[key].replace("需求", "").replace("养老金", "缺口").slice(0, 2),
    angle: -90 + (360 / list.length) * index
  }));

  const points = nodes.map((node) => {
    const value = profile.scores[node.key] || 18;
    const radius = 58 + value * 0.74;
    const radians = (node.angle * Math.PI) / 180;
    return {
      ...node,
      value,
      x: centerX + Math.cos(radians) * radius,
      y: centerY + Math.sin(radians) * radius
    };
  });

  [48, 82, 116, 150].forEach((radius) => {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.09)";
    ctx.stroke();
  });

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(207, 93, 63, 0.25)";
  ctx.strokeStyle = "rgba(248,255,253,0.9)";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  points.forEach((point) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(point.x, point.y);
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = axisColors[point.key];
    ctx.fill();

    ctx.fillStyle = "#f8fffd";
    ctx.font = "700 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(point.label, point.x, point.y - 14);

    ctx.fillStyle = "rgba(248,255,253,0.75)";
    ctx.font = "700 12px Arial";
    ctx.fillText(String(point.value), point.x, point.y + 24);
  });

  drawAllocationDonut(ctx, profile, centerX, centerY);
}

function drawAllocationDonut(ctx, profile, centerX, centerY) {
  let start = -Math.PI / 2;
  const radius = 32;
  const lineWidth = 9;
  categoryOrder.forEach((category) => {
    const slice = (profile.allocation[category] / 100) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, start, start + slice);
    ctx.strokeStyle = categoryColor(category);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    start += slice;
  });

  ctx.beginPath();
  ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
  ctx.fillStyle = "#f8fffd";
  ctx.fill();
  ctx.fillStyle = "#102724";
  ctx.font = "800 17px Arial";
  ctx.textAlign = "center";
  ctx.fillText("稳退", centerX, centerY + 6);
}

function switchTab(tab) {
  state.tab = tab;
  elements.tabs.forEach((button) => button.classList.toggle("is-active", button.dataset.tab === tab));
  elements.views.forEach((view) => view.classList.toggle("is-visible", view.dataset.view === tab));
  window.location.hash = tab;
}

function render() {
  const profile = calculateProfile();
  renderQuestion();
  renderResult(profile);
  renderSnapshot(profile);
  renderCatalog();
  renderCanvas(profile);
}

elements.tabs.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

elements.prevBtn.addEventListener("click", () => {
  state.current = Math.max(0, state.current - 1);
  renderQuestion();
});

elements.nextBtn.addEventListener("click", () => {
  if (state.current < questions.length - 1) {
    state.current += 1;
    renderQuestion();
  } else {
    switchTab("result");
    render();
  }
});

elements.resetBtn.addEventListener("click", () => {
  state.answers = {};
  saveAnswers();
  state.current = 0;
  switchTab("assessment");
  render();
});

elements.catalogFilter.addEventListener("change", renderCatalog);

window.addEventListener("hashchange", () => {
  const tab = window.location.hash.replace("#", "");
  if (["assessment", "result", "catalog"].includes(tab)) {
    switchTab(tab);
  }
});

const initialTab = window.location.hash.replace("#", "");
if (["assessment", "result", "catalog"].includes(initialTab)) {
  switchTab(initialTab);
}

render();
