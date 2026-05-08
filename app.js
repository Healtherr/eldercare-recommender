const axes = {
  horizon: "退休期限",
  contribution: "储备能力",
  risk: "风险承受",
  stability: "收入稳定",
  liquidity: "流动性需求",
  protection: "保障缺口",
  pensionGap: "养老金缺口"
};

const axisColors = {
  horizon: "#0f766e",
  contribution: "#315bdc",
  risk: "#cf5d3f",
  stability: "#b97813",
  liquidity: "#6b5fbb",
  protection: "#4f7f45",
  pensionGap: "#097a9f"
};

const categoryNames = {
  savings: "储蓄",
  wealth: "理财",
  fund: "基金",
  insurance: "保险"
};

const questions = [
  {
    id: "age",
    section: "基础画像",
    title: "你的当前年龄段",
    hint: "年龄决定养老资金可积累年限，也会影响储蓄、基金和保险的配置顺序。",
    options: [
      { label: "35-40 岁", detail: "距离退休较远，可用长期定投和复利积累提高养老资金弹性。", weights: { horizon: 36, risk: 22, contribution: 14, pensionGap: 16 }, preference: "fund" },
      { label: "41-45 岁", detail: "仍有较长准备期，适合兼顾增长和保障补强。", weights: { horizon: 30, risk: 18, contribution: 18, protection: 12, pensionGap: 18 }, preference: "fund" },
      { label: "46-50 岁", detail: "进入养老规划加速期，需要稳定储备和风险控制并重。", weights: { horizon: 22, contribution: 22, stability: 20, protection: 16, pensionGap: 22 }, preference: "wealth" },
      { label: "51-55 岁", detail: "应提高确定性资产占比，逐步锁定退休现金流。", weights: { horizon: 14, stability: 30, liquidity: 18, protection: 20, pensionGap: 28 }, preference: "wealth" },
      { label: "56-60 岁", detail: "临近退休，重点是保本、现金流安排和保障缺口检查。", weights: { horizon: 8, stability: 38, liquidity: 28, protection: 24, pensionGap: 34 }, preference: "savings" }
    ]
  },
  {
    id: "retireAge",
    section: "退休目标",
    title: "你预计什么时候退休或半退休",
    hint: "退休时间越近，组合越需要降低波动；时间越长，越能承受阶段性净值波动。",
    options: [
      { label: "20 年以后", detail: "适合长期账户与定投纪律，更多利用时间换空间。", weights: { horizon: 40, risk: 22, contribution: 14 }, preference: "fund" },
      { label: "10-20 年", detail: "适合增长和稳健配置并行，定期再平衡。", weights: { horizon: 30, risk: 16, contribution: 18, stability: 12 }, preference: "fund" },
      { label: "5-10 年", detail: "适合稳健理财、储蓄和年金现金流逐步加码。", weights: { horizon: 18, stability: 28, liquidity: 18, protection: 14 }, preference: "wealth" },
      { label: "5 年以内", detail: "优先确保本金安全、领取节奏和应急资金。", weights: { horizon: 8, stability: 40, liquidity: 32, protection: 18 }, preference: "savings" }
    ]
  },
  {
    id: "currentReserve",
    section: "资产基础",
    title: "你已经为养老准备了多少专项资金",
    hint: "已有储备越少，越需要提高月度投入和基础保障；已有储备越多，越需要结构优化。",
    options: [
      { label: "几乎没有专项储备", detail: "需要先建立养老账户和自动投入机制。", weights: { pensionGap: 42, contribution: 14, liquidity: 18, protection: 18 }, preference: "savings" },
      { label: "10 万元以内", detail: "可从储蓄垫和低门槛定投开始。", weights: { pensionGap: 34, contribution: 18, liquidity: 16, stability: 12 }, preference: "savings" },
      { label: "10-50 万元", detail: "适合做四类产品分层配置，提升收益与保障效率。", weights: { pensionGap: 24, contribution: 24, risk: 12, stability: 14 }, preference: "wealth" },
      { label: "50-150 万元", detail: "重点从产品堆叠转为目标配置和税务/领取规划。", weights: { contribution: 32, stability: 20, risk: 16, protection: 12 }, preference: "wealth" },
      { label: "150 万元以上", detail: "适合做长期现金流、保险权益和多账户管理。", weights: { contribution: 38, stability: 26, protection: 14, risk: 14 }, preference: "insurance" }
    ]
  },
  {
    id: "monthlySaving",
    section: "资产基础",
    title: "每月可用于养老规划的新增投入",
    hint: "新增投入能力决定组合颗粒度、产品门槛和调整频率。",
    options: [
      { label: "500 元以内", detail: "优先低门槛储蓄、基金定投和基础保障。", weights: { contribution: 12, pensionGap: 32, liquidity: 20 }, capacityLevel: 1, monthlyRange: "100-500 元/月" },
      { label: "500-2000 元", detail: "可建立稳定月投，并配置少量保险保障。", weights: { contribution: 24, pensionGap: 22, stability: 12 }, capacityLevel: 2, monthlyRange: "500-2000 元/月" },
      { label: "2000-5000 元", detail: "可同时覆盖定投、稳健理财和保障补强。", weights: { contribution: 34, risk: 12, stability: 16, protection: 12 }, capacityLevel: 3, monthlyRange: "2000-5000 元/月" },
      { label: "5000 元以上", detail: "适合做多账户组合、年金现金流和长期权益资产。", weights: { contribution: 44, risk: 18, stability: 18, protection: 16 }, capacityLevel: 4, monthlyRange: "5000 元以上/月" }
    ]
  },
  {
    id: "incomeStability",
    section: "现金流",
    title: "你的未来 3 年收入稳定性",
    hint: "收入波动越大，越要提高流动性和保障；收入稳定则可增加长期配置。",
    options: [
      { label: "非常稳定", detail: "工资或经营收入可预期，适合自动扣款和长期计划。", weights: { stability: 38, contribution: 22, risk: 14 } },
      { label: "基本稳定", detail: "偶有波动但不影响家庭现金流。", weights: { stability: 28, contribution: 18, liquidity: 12 } },
      { label: "波动较大", detail: "奖金、项目或经营收入占比较高，需要现金垫。", weights: { liquidity: 34, protection: 18, pensionGap: 16, stability: 10 }, preference: "savings" },
      { label: "不太稳定", detail: "职业或经营存在不确定性，先守住应急和保障底线。", weights: { liquidity: 44, protection: 28, pensionGap: 22, stability: 8 }, preference: "insurance" }
    ]
  },
  {
    id: "familyBurden",
    section: "家庭责任",
    title: "当前家庭责任和支出压力",
    hint: "子女教育、房贷、赡养父母等责任会影响养老资金的可持续投入。",
    options: [
      { label: "压力较轻", detail: "家庭支出可控，可更早建立长期账户。", weights: { contribution: 26, risk: 16, horizon: 12 } },
      { label: "有固定房贷或教育支出", detail: "需要平衡长期投入和短期现金流。", weights: { liquidity: 26, pensionGap: 18, stability: 14 } },
      { label: "上有老下有小", detail: "保障缺口和现金流韧性要先补齐。", weights: { protection: 38, liquidity: 28, pensionGap: 22 }, preference: "insurance" },
      { label: "支出压力很高", detail: "先做低成本基础组合，避免高承诺产品造成负担。", weights: { liquidity: 42, pensionGap: 30, protection: 28 }, preference: "savings" }
    ]
  },
  {
    id: "emergencyFund",
    section: "现金流",
    title: "你的家庭应急金能覆盖多久开支",
    hint: "应急金不足时，不宜把养老资金过多锁定在长期产品里。",
    options: [
      { label: "不足 3 个月", detail: "先补流动性，再做长期养老配置。", weights: { liquidity: 46, pensionGap: 20, protection: 16 }, preference: "savings" },
      { label: "3-6 个月", detail: "具备基础缓冲，可开始小额定投和稳健理财。", weights: { liquidity: 30, stability: 14, contribution: 12 }, preference: "savings" },
      { label: "6-12 个月", detail: "现金垫较充足，可扩大长期投入比例。", weights: { stability: 28, contribution: 22, risk: 12 }, preference: "wealth" },
      { label: "12 个月以上", detail: "流动性较安全，可提高基金或年金类长期配置。", weights: { stability: 34, contribution: 26, risk: 18 }, preference: "fund" }
    ]
  },
  {
    id: "riskTolerance",
    section: "风险偏好",
    title: "面对养老资金短期亏损，你的接受程度",
    hint: "养老资金不是越保守越好，也不是越激进越好，关键是和期限匹配。",
    options: [
      { label: "不能接受亏损", detail: "优先储蓄、低风险理财和确定性现金流。", weights: { stability: 42, liquidity: 24, risk: 6 }, preference: "savings" },
      { label: "可接受 5% 以内波动", detail: "适合稳健理财与少量低波动基金。", weights: { stability: 32, risk: 18, liquidity: 14 }, preference: "wealth" },
      { label: "可接受 5%-15% 波动", detail: "适合均衡组合，用基金定投提升长期收益。", weights: { risk: 34, horizon: 16, contribution: 16 }, preference: "fund" },
      { label: "可接受更高波动", detail: "适合长期权益资产，但仍要保留储蓄和保险底仓。", weights: { risk: 48, horizon: 22, contribution: 18 }, preference: "fund" }
    ]
  },
  {
    id: "investmentExperience",
    section: "风险偏好",
    title: "你过往的投资经验",
    hint: "经验会影响产品复杂度和是否适合主动调仓。",
    options: [
      { label: "只用过存款", detail: "需要低波动、低复杂度产品先建立信任。", weights: { stability: 34, liquidity: 20, risk: 8 }, preference: "savings" },
      { label: "买过银行理财", detail: "可从固收+、现金管理和低波动组合过渡。", weights: { stability: 28, risk: 16, contribution: 12 }, preference: "wealth" },
      { label: "有基金定投经验", detail: "适合目标日期或目标风险基金承接养老目标。", weights: { risk: 34, horizon: 18, contribution: 18 }, preference: "fund" },
      { label: "熟悉多类资产", detail: "可做更细的账户分层和再平衡策略。", weights: { risk: 40, contribution: 24, stability: 16 }, preference: "fund" }
    ]
  },
  {
    id: "insuranceStatus",
    section: "保障底座",
    title: "你目前的商业保险保障",
    hint: "养老规划不能只看收益，健康、身故和长期现金流风险也要覆盖。",
    options: [
      { label: "保障较完整", detail: "已有医疗、重疾、寿险或养老年金。", weights: { protection: 10, stability: 16, contribution: 12 } },
      { label: "只有基础医疗险", detail: "建议补齐大病、家庭责任和未来养老现金流。", weights: { protection: 34, pensionGap: 16 }, preference: "insurance" },
      { label: "保障不清楚", detail: "需要先做保单体检，再决定保险类产品占比。", weights: { protection: 42, liquidity: 16, pensionGap: 18 }, preference: "insurance" },
      { label: "几乎没有商业保险", detail: "应优先补保障缺口，避免风险打断养老储备。", weights: { protection: 52, liquidity: 20, pensionGap: 24 }, preference: "insurance" }
    ]
  },
  {
    id: "pensionSource",
    section: "退休收入",
    title: "你预计退休后的主要收入来源",
    hint: "退休收入来源越单一，越需要提前建立第二、第三支柱。",
    options: [
      { label: "社保养老金为主", detail: "需要额外补充个人养老金和商业养老现金流。", weights: { pensionGap: 42, protection: 22, contribution: 14 }, preference: "insurance" },
      { label: "社保 + 存款", detail: "应提高长期收益资产和现金流产品的搭配。", weights: { pensionGap: 30, stability: 22, liquidity: 14 }, preference: "wealth" },
      { label: "社保 + 投资收益", detail: "需要控制波动并建立退休前后的再平衡规则。", weights: { risk: 24, stability: 20, horizon: 14 }, preference: "fund" },
      { label: "已有多元安排", detail: "适合做账户整合、税优和领取节奏优化。", weights: { contribution: 30, stability: 24, protection: 12 }, preference: "wealth" }
    ]
  },
  {
    id: "retirementGoal",
    section: "退休收入",
    title: "你希望退休后达到的生活状态",
    hint: "目标越高，养老金缺口越可能放大，需要更早规划投入和收益结构。",
    options: [
      { label: "基础生活即可", detail: "重点保证安全垫和基础现金流。", weights: { stability: 30, liquidity: 22, pensionGap: 14 }, preference: "savings" },
      { label: "保持现有生活水平", detail: "需要储蓄、理财和基金共同积累。", weights: { pensionGap: 28, contribution: 22, stability: 18 }, preference: "wealth" },
      { label: "希望有旅行和兴趣预算", detail: "需要长期增长资产补足弹性消费。", weights: { pensionGap: 38, risk: 22, horizon: 16 }, preference: "fund" },
      { label: "希望给家人留资产", detail: "需要现金流、保障和财富传承类产品配合。", weights: { protection: 38, stability: 24, pensionGap: 22 }, preference: "insurance" }
    ]
  },
  {
    id: "managementStyle",
    section: "使用偏好",
    title: "你更偏好的产品管理方式",
    hint: "管理方式会影响推荐产品的复杂度和后续维护成本。",
    options: [
      { label: "越省心越好", detail: "偏向储蓄、年金和低维护的稳健产品。", weights: { stability: 34, liquidity: 18 }, preference: "savings" },
      { label: "每季度看一次", detail: "适合稳健理财和目标风险基金组合。", weights: { stability: 26, risk: 16, contribution: 14 }, preference: "wealth" },
      { label: "愿意长期定投", detail: "适合基金定投和目标日期策略。", weights: { horizon: 26, risk: 28, contribution: 18 }, preference: "fund" },
      { label: "想先补保障", detail: "适合先做保险体检和养老年金规划。", weights: { protection: 42, pensionGap: 18 }, preference: "insurance" }
    ]
  }
];

const productCatalog = [
  {
    id: "pension-savings",
    name: "养老目标储蓄账户",
    category: "savings",
    shortType: "储",
    price: "建议配置 15%-35%",
    riskTier: "低风险",
    level: 1,
    summary: "用于沉淀养老基础资金，适合自动转入、定期复盘和与应急金分账管理。",
    tags: ["低波动", "分账管理", "自动积累"],
    weights: { liquidity: 0.28, stability: 0.28, pensionGap: 0.18, contribution: 0.16, protection: 0.06, horizon: 0.04 }
  },
  {
    id: "ladder-deposit",
    name: "阶梯存单组合",
    category: "savings",
    shortType: "阶",
    price: "建议配置 10%-30%",
    riskTier: "低风险",
    level: 1,
    summary: "把资金拆成不同期限，兼顾利率锁定、到期续接和临时支取弹性。",
    tags: ["期限分层", "现金流", "稳健底仓"],
    weights: { stability: 0.34, liquidity: 0.26, pensionGap: 0.14, contribution: 0.1, protection: 0.08, horizon: 0.08 }
  },
  {
    id: "cash-buffer",
    name: "养老金现金管理垫",
    category: "savings",
    shortType: "垫",
    price: "建议配置 5%-20%",
    riskTier: "低风险",
    level: 1,
    summary: "保留 6-12 个月养老规划投入或家庭支出，避免市场波动时被迫赎回。",
    tags: ["流动性", "应急金", "低门槛"],
    weights: { liquidity: 0.42, stability: 0.22, protection: 0.12, pensionGap: 0.12, contribution: 0.08, risk: 0.04 }
  },
  {
    id: "fixed-income-plus",
    name: "固收+养老理财",
    category: "wealth",
    shortType: "理",
    price: "建议配置 15%-35%",
    riskTier: "中低风险",
    level: 2,
    summary: "以固收资产为主，少量权益或转债增强收益，适合作为养老稳健增值层。",
    tags: ["固收+", "稳健增值", "低维护"],
    weights: { stability: 0.3, contribution: 0.2, risk: 0.14, pensionGap: 0.14, horizon: 0.1, liquidity: 0.08, protection: 0.04 }
  },
  {
    id: "closed-wealth",
    name: "封闭式稳健理财",
    category: "wealth",
    shortType: "封",
    price: "建议配置 10%-30%",
    riskTier: "中低风险",
    level: 2,
    summary: "通过固定期限提升资金纪律，适合 1-3 年不用的养老中短期资金。",
    tags: ["期限纪律", "净值型", "稳健"],
    weights: { stability: 0.34, contribution: 0.18, horizon: 0.12, risk: 0.1, pensionGap: 0.1, liquidity: 0.1, protection: 0.06 }
  },
  {
    id: "target-date-fund",
    name: "养老目标日期基金",
    category: "fund",
    shortType: "基",
    price: "建议配置 15%-40%",
    riskTier: "中风险",
    level: 2,
    summary: "按目标退休年份逐步降低权益占比，适合有 10 年以上准备期的人群。",
    tags: ["目标日期", "长期定投", "自动降风险"],
    weights: { horizon: 0.28, risk: 0.26, contribution: 0.2, pensionGap: 0.12, stability: 0.06, liquidity: 0.04, protection: 0.04 }
  },
  {
    id: "target-risk-fund",
    name: "养老目标风险基金",
    category: "fund",
    shortType: "配",
    price: "建议配置 10%-35%",
    riskTier: "中风险",
    level: 2,
    summary: "按稳健、均衡、积极等风险等级运作，适合想少调仓但需要增长弹性的人群。",
    tags: ["目标风险", "多资产", "少调仓"],
    weights: { risk: 0.28, horizon: 0.22, contribution: 0.18, stability: 0.12, pensionGap: 0.1, liquidity: 0.05, protection: 0.05 }
  },
  {
    id: "index-dca",
    name: "宽基指数基金定投",
    category: "fund",
    shortType: "投",
    price: "建议配置 5%-25%",
    riskTier: "中高风险",
    level: 2,
    summary: "通过长期定投参与权益市场增长，需要较长持有期和回撤承受能力。",
    tags: ["长期增长", "定投", "权益资产"],
    weights: { risk: 0.38, horizon: 0.28, contribution: 0.16, pensionGap: 0.1, stability: 0.03, liquidity: 0.03, protection: 0.02 }
  },
  {
    id: "annuity",
    name: "商业养老年金保险",
    category: "insurance",
    shortType: "年",
    price: "建议配置 10%-30%",
    riskTier: "保障/现金流",
    level: 3,
    summary: "把一部分资金转换为未来确定领取现金流，适合临退期或希望锁定养老收入的人群。",
    tags: ["养老现金流", "长期领取", "确定性"],
    weights: { protection: 0.3, pensionGap: 0.24, stability: 0.2, contribution: 0.12, horizon: 0.08, liquidity: 0.04, risk: 0.02 }
  },
  {
    id: "whole-life",
    name: "增额终身寿/养老金转换",
    category: "insurance",
    shortType: "寿",
    price: "建议配置 5%-25%",
    riskTier: "保障/长期",
    level: 3,
    summary: "兼顾长期现金价值、家庭责任和资产传承，需要关注缴费期、退保成本和流动性。",
    tags: ["长期现金价值", "家庭责任", "传承"],
    weights: { protection: 0.34, stability: 0.18, pensionGap: 0.16, contribution: 0.14, liquidity: 0.08, horizon: 0.06, risk: 0.04 }
  },
  {
    id: "health-cover",
    name: "健康保障补强包",
    category: "insurance",
    shortType: "保",
    price: "建议优先核查",
    riskTier: "保障型",
    level: 1,
    summary: "补齐医疗、重疾、寿险等基础保障，避免大额健康支出打断养老资金积累。",
    tags: ["医疗险", "重疾险", "保单体检"],
    weights: { protection: 0.46, liquidity: 0.18, pensionGap: 0.14, stability: 0.12, contribution: 0.06, horizon: 0.02, risk: 0.02 }
  }
];

const defaultScores = Object.keys(axes).reduce((acc, key) => {
  acc[key] = 16;
  return acc;
}, {});

const storageKey = "retirementPlannerAnswers";

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
  canvas: document.querySelector("#careCanvas")
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

    if (option.preference) {
      preferences.push(option.preference);
    }

    if (option.capacityLevel) {
      capacityLevel = option.capacityLevel;
    }

    if (option.monthlyRange) {
      monthlyRange = option.monthlyRange;
    }
  });

  const answered = getAnsweredCount();
  const scores = {};
  Object.keys(axes).forEach((axis) => {
    const completionLift = answered ? 0 : -6;
    scores[axis] = clamp(18 + totals[axis] / 2.8 + completionLift);
  });

  const preference = getMode(preferences) || "wealth";
  const allocation = calculateAllocation(scores, preference);
  const profileType = createProfileType(scores, preference);
  const recommendations = scoreProducts(scores, preference, capacityLevel);
  const topNeeds = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

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
    complete: answered === questions.length
  };
}

function getMode(values) {
  const counts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
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

  if (scores.horizon > 65 && scores.risk > 50) {
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

  if (scores.risk > 68) {
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
    allocation[category] = Math.max(8, Math.min(50, allocation[category]));
  });

  const total = Object.values(allocation).reduce((sum, value) => sum + value, 0);
  const normalized = {};
  let used = 0;
  const categories = Object.keys(allocation);

  categories.forEach((category, index) => {
    if (index === categories.length - 1) {
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
  const styleCode = scores.risk >= 64 ? "G" : scores.stability >= 62 || scores.liquidity >= 62 ? "S" : "B";
  const protectionCode = scores.protection >= 58 || scores.pensionGap >= 62 ? "P+" : "P0";

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
  const preferenceText = categoryNames[preference] || "均衡";

  return {
    code: `${horizonCode}-${styleCode}-${protectionCode}`,
    title: `${horizonText} · ${styleText}`,
    copy: `以${preferenceText}为偏好入口，采用${protectionText}和四类产品分层配置。`
  };
}

function scoreProducts(scores, preference, capacityLevel) {
  return productCatalog
    .map((product) => {
      const needScore = Object.entries(product.weights).reduce((sum, [axis, weight]) => {
        return sum + scores[axis] * weight;
      }, 0);

      const preferenceBoost = product.category === preference ? 10 : 0;
      const capacityPenalty = Math.max(0, product.level - capacityLevel) * 6;
      const riskPenalty = product.category === "fund" && scores.risk < 34 ? 10 : 0;
      const shortHorizonPenalty = product.category === "fund" && scores.horizon < 34 ? 8 : 0;
      const protectionBoost = product.category === "insurance" && scores.protection > 60 ? 8 : 0;
      const liquidityBoost = product.category === "savings" && scores.liquidity > 60 ? 7 : 0;

      return {
        ...product,
        match: clamp(needScore + preferenceBoost + protectionBoost + liquidityBoost - capacityPenalty - riskPenalty - shortHorizonPenalty)
      };
    })
    .sort((a, b) => b.match - a.match);
}

function getPackage(profile) {
  const categories = Object.keys(categoryNames).sort((a, b) => profile.allocation[b] - profile.allocation[a]);
  const items = categories.map((category) => {
    const product = profile.recommendations.find((item) => item.category === category);
    return {
      ...product,
      allocation: profile.allocation[category]
    };
  });

  return {
    title: `${profile.profileType.title}四类养老组合`,
    summary: buildPackageSummary(profile, items),
    cost: `建议月投入：${profile.monthlyRange} · 按比例拆分后每年复盘`,
    items
  };
}

function buildPackageSummary(profile, packageItems) {
  const topAxisLabels = profile.topNeeds.map(([axis]) => axes[axis]).join("、");
  const categoryText = packageItems.map((item) => `${categoryNames[item.category]} ${item.allocation}%`).join("，");
  return `当前画像优先关注${topAxisLabels}。建议先按 ${categoryText} 搭建基础组合，再结合真实风险测评、产品费率和家庭现金流微调。`;
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

  elements.packageStack.innerHTML = packageData.items
    .map(
      (product) => `
        <article class="package-item">
          <span class="package-icon" aria-hidden="true">${product.shortType}</span>
          <div>
            <strong>${categoryNames[product.category]} ${product.allocation}% · ${product.name}</strong>
            <span>${product.riskTier} · 匹配度 ${product.match} · ${product.summary}</span>
          </div>
        </article>
      `
    )
    .join("");

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

  elements.reasonList.innerHTML = buildReasons(profile)
    .map((reason) => `<div class="reason-item">${reason}</div>`)
    .join("");

  elements.actionPlan.innerHTML = buildActionPlan(profile)
    .map((step) => `<li>${step}</li>`)
    .join("");
}

function buildReasons(profile) {
  const reasonMap = {
    horizon: "退休期限越长，越适合用基金定投和目标日期产品承接长期增长；期限越短，则应逐步提高确定性资产。",
    contribution: "储备能力越强，越能做多账户配置；储备能力较弱时，应先建立自动月投和低门槛组合。",
    risk: "风险承受越高，基金类产品可承担更多增长任务；风险承受较低时，应控制权益波动。",
    stability: "收入稳定性越高，越适合长期投入和封闭期限产品；稳定性不足时，应保留更多灵活资金。",
    liquidity: "流动性需求较高，储蓄和现金管理垫应更靠前，避免养老资金被短期开支打断。",
    protection: "保障缺口明显时，保险类产品不是附加项，而是保护养老账户不被风险击穿的底座。",
    pensionGap: "养老金缺口越高，越需要提高投入率、延长积累期或引入更高长期收益弹性的产品。"
  };

  const reasons = profile.topNeeds.map(([axis, value]) => `${axes[axis]} ${value} 分：${reasonMap[axis]}`);

  if (profile.scores.horizon < 38) {
    reasons.push("距离退休较近，建议减少高波动产品的一次性投入，用分批配置和到期资金承接降低择时风险。");
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
  if (topAxes.includes("stability")) {
    steps.push("把 1-3 年不用的资金放入稳健理财或阶梯存单，形成中短期承接层。");
  }

  steps.push("每年固定复盘一次配置比例、产品费率、收益表现和家庭现金流变化。");
  return steps.slice(0, 6);
}

function renderSnapshot(profile) {
  const topNeed = profile.topNeeds[0];
  const picks = profile.recommendations.slice(0, 3);

  elements.snapshotTitle.textContent = profile.answered ? profile.profileType.title : "未完成测评";
  elements.snapshotCopy.textContent = profile.answered
    ? profile.profileType.copy
    : "选择答案后，右侧会同步出现退休期限、储备能力、保障缺口与产品组合倾向。";
  elements.answeredCount.textContent = `${profile.answered}/${questions.length}`;
  elements.topNeed.textContent = topNeed ? axes[topNeed[0]] : "--";
  elements.budgetSignal.textContent = getContributionSignal(profile.scores.contribution);

  elements.livePicks.innerHTML = picks
    .map(
      (product, index) => `
        <article class="live-pick">
          <span class="pick-rank">${index + 1}</span>
          <div>
            <strong>${product.name}</strong>
            <span>${categoryNames[product.category]} · 匹配度 ${product.match} · ${product.price}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function getContributionSignal(value) {
  if (value >= 68) return "强";
  if (value >= 45) return "中";
  return "起步";
}

function renderCatalog() {
  const filter = elements.catalogFilter.value;
  const products = filter === "all" ? productCatalog : productCatalog.filter((product) => product.category === filter);

  elements.catalogGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <strong>${product.name}</strong>
          <span>${product.price} · ${product.riskTier}</span>
          <div class="tag-row">
            ${product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <p>${product.summary}</p>
          <span class="price-line">产品类别：${categoryLabel(product.category)}</span>
        </article>
      `
    )
    .join("");
}

function categoryLabel(category) {
  return categoryNames[category];
}

function renderCanvas(profile) {
  const canvas = elements.canvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2 + 8;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#102724";
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

  const nodes = [
    { key: "horizon", label: "期限", angle: -90 },
    { key: "contribution", label: "储备", angle: -35 },
    { key: "risk", label: "风险", angle: 20 },
    { key: "stability", label: "收入", angle: 75 },
    { key: "liquidity", label: "流动", angle: 145 },
    { key: "protection", label: "保障", angle: 205 },
    { key: "pensionGap", label: "缺口", angle: 265 }
  ];

  const points = nodes.map((node) => {
    const value = profile.scores[node.key] || 18;
    const radius = 74 + value * 0.72;
    const radians = (node.angle * Math.PI) / 180;
    return {
      ...node,
      value,
      x: centerX + Math.cos(radians) * radius,
      y: centerY + Math.sin(radians) * radius
    };
  });

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(207, 93, 63, 0.24)";
  ctx.strokeStyle = "rgba(207, 93, 63, 0.86)";
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
    ctx.arc(point.x, point.y, 9, 0, Math.PI * 2);
    ctx.fillStyle = axisColors[point.key];
    ctx.fill();

    ctx.fillStyle = "#f8fffd";
    ctx.font = "700 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(point.label, point.x, point.y - 16);

    ctx.fillStyle = "rgba(248,255,253,0.74)";
    ctx.font = "700 13px Arial";
    ctx.fillText(String(point.value), point.x, point.y + 27);
  });

  ctx.beginPath();
  ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
  ctx.fillStyle = "#f8fffd";
  ctx.fill();
  ctx.fillStyle = "#102724";
  ctx.font = "800 18px Arial";
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
