document.getElementById('skin-quiz-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const q1_oil = document.querySelector('input[name="q1_oil"]:checked')?.value;
    const q2_dry = document.querySelector('input[name="q2_dry"]:checked')?.value;
    const q3_sensitive = document.querySelector('input[name="q3_sensitive"]:checked')?.value;

    if (!q1_oil || !q2_dry || !q3_sensitive) {
        alert("請完成所有題目才能查看結果！");
        return;
    }

    let skinKey = '';
    
    // 判斷核心肌膚類型
    if (q1_oil === 'slow' && q2_dry === 'yes') {
        skinKey = 'dry';
    } else if (q1_oil === 'fast' && q2_dry === 'no') {
        skinKey = 'oily';
    } else if (q1_oil === 'medium') {
        skinKey = 'combination';
    } else if (q1_oil === 'slow' && q2_dry === 'no') {
        skinKey = 'normal';
    } else {
        skinKey = 'unstable';
    }

    // 取得報告內容
    let reportData = getUniqueSkinReport(skinKey, q3_sensitive === 'yes');

    // 顯示結果
    document.getElementById('skin-type-display').innerHTML = reportData.typeDisplay;
    document.getElementById('recommendation-display').innerHTML = reportData.htmlContent;
    document.getElementById('result-area').style.display = 'block';
    
    document.getElementById('result-area').scrollIntoView({ behavior: 'smooth' });
});


// --- 獨特報告內容儲存庫 (JSON Like Structure) ---

function getUniqueSkinReport(key, isSensitive) {
    
    // 基礎報告內容
    const reports = {
        'dry': {
            type: "🌌 極需滋養的乾性肌 (Xerotic Skin)",
            condition: "皮脂和水分嚴重不足，肌膚屏障受損風險高，容易顯現細紋和季節性脫屑。目標是重建脂質結構。",
            phase1: {
                title: "階段一：基礎穩定與補油",
                action: "將所有清潔步驟溫度調低，並鎖定**油性保濕品**。使用**油狀精華**代替水狀精華，確保睡前臉頰有輕微的油潤感。"
            },
            phase2: {
                title: "階段二：進階強化與抗老",
                action: "在穩定的油性基礎上，可嘗試低濃度的**A醇 (Retinol)** 或**補骨脂酚 (Bakuchiol)** 於夜間使用，進行初期抗老與改善紋理。"
            },
            taboo: "❌ 禁忌：含有**SLS/SLES** 的強力起泡劑洗面乳、酒精濃度高的化妝水、單純無油的凝膠類產品。",
            ingredients: "🔑 關鍵成分：**神經醯胺 (Ceramide 3/6 II)**, **角鯊烷 (Squalene)**, **月見草油 (Evening Primrose Oil)**, **尿素 (Urea)**。"
        },
        'oily': {
            type: "🌋 高效代謝的油性肌 (Sebaceous Skin)",
            condition: "皮脂腺過度活躍，毛孔飽受油脂和老廢角質堆積的困擾。目標是溫和控油與暢通角質管道。",
            phase1: {
                title: "階段一：基礎穩定與疏通",
                action: "將清潔時間控制在 30 秒內，避免過度搓揉。每日早晚使用**煙醯胺 (Niacinamide/B3)** 幫助調節皮脂，並每周進行 1-2 次清潔泥膜。"
            },
            phase2: {
                title: "階段二：進階強化與細緻",
                action: "視肌膚耐受性，引入**水楊酸 (BHA)** 或**杜鵑花酸**，針對性處理黑頭粉刺，目標是視覺上收斂毛孔並保持清爽感。"
            },
            taboo: "❌ 禁忌：**礦物油**、**羊毛脂**等高致粉刺性的封閉性成分。避免頻繁使用**磨砂膏**等物理去角質產品。",
            ingredients: "🔑 關鍵成分：**煙醯胺 (Niacinamide)**, **水楊酸 (Salicylic Acid)**, **綠茶多酚 (EGCG)**, **鋅鹽 (Zinc PCA)**。"
        },
        'combination': {
            type: "⚖️ 區域差異的混合肌 (Regional Balance)",
            condition: "T字部位偏油且易長痘，兩頰則可能偏乾或中性。保養策略必須採取「分治」，是最大的挑戰。",
            phase1: {
                title: "階段一：基礎穩定與分區",
                action: "在**T字部位**使用**清爽型凝膠**，在**兩頰**使用**中度滋潤的乳液**。在清潔後，先將水分鎖在兩頰。"
            },
            phase2: {
                title: "階段二：進階強化與修飾",
                action: "T字部位可局部使用**低濃度果酸 (AHA)** 進行角質拋光，而兩頰則著重於**維生素C**的抗氧化，達成膚色均勻目標。"
            },
            taboo: "❌ 禁忌：只使用單一質地的保養品（例如：全臉都擦厚重乳霜），這會加劇區域失衡。",
            ingredients: "🔑 關鍵成分：T區：**海藻萃取**、**透明質酸**。兩頰：**角鯊烯 (Squalene)**, **泛醇 (Panthenol)**, **神經醯胺**。"
        },
        'normal': {
            type: "💎 健康穩定的中性肌 (Eudermic Skin)",
            condition: "水油分泌平衡，無明顯困擾。應將保養重點從「治療」轉向「預防」，尤其是環境傷害和光老化。",
            phase1: {
                title: "階段一：基礎穩定與預防",
                action: "維持簡潔的洗臉、化妝水、輕乳液三步驟。日常保養的核心是**廣譜防曬 SPF30+**，將防曬視為最重要的精華。"
            },
            phase2: {
                title: "階段二：進階強化與活力",
                action: "引入高效抗氧化精華，如**維生素C衍生物 (Ascorbyl Glucoside)** 於日間使用，搭配**胜肽 (Peptides)** 於夜間使用，提前儲備肌膚能量。"
            },
            taboo: "❌ 禁忌：過多的疊擦，會造成肌膚負擔。不要在肌膚無異常時隨意使用高濃度酸類或去角質產品。",
            ingredients: "🔑 關鍵成分：**強效廣譜防曬劑**、**維生素C (Ascorbic Acid)**, **多種胜肽** (如 Matrixyl), **玻尿酸**。"
        },
        'unstable': {
            type: "🌀 狀態不穩定的肌膚 (Transient State)",
            condition: "可能是受到季節、壓力、飲食或荷爾蒙影響。當前應以**舒緩鎮靜**為首要任務，暫時放掉所有功能性產品。",
            phase1: {
                title: "階段一：基礎穩定與清零",
                action: "將所有保養品替換為**嬰兒級別的溫和產品**。洗臉後只使用**一瓶成分單純的保濕乳**。記錄飲食和睡眠，找出壓力源。"
            },
            phase2: {
                title: "階段二：進階強化與重建",
                action: "當泛紅、乾癢等現象消失後，參考**混合肌**的建議逐步恢復。此時不可一次加入超過一種新產品。"
            },
            taboo: "❌ 禁忌：美白產品、高濃度維生素A（A醇）、去角質產品。任何有**明顯香味**或**刺痛感**的產品。",
            ingredients: "🔑 關鍵成分：**積雪草 (Centella Asiatica)**, **泛醇 (B5)**, **沒藥醇 (Bisabolol)**, **微分子玻尿酸**。"
        }
    };
    
    let report = reports[key];
    let typeDisplay = report.type;
    let htmlContent = `
        <h4 class="report-section">🔬 肌膚狀態分析：</h4>
        <p>${report.condition}</p>

        <h4 class="report-section">${report.phase1.title}：</h4>
        <p><strong>[行動指南]</strong>：${report.phase1.action}</p>

        <h4 class="report-section">${report.phase2.title}：</h4>
        <p><strong>[行動指南]</strong>：${report.phase2.action}</p>

        <h4 class="report-section">🔑 關鍵保養成分：</h4>
        <p>${report.ingredients}</p>
        
        <h4 class="report-section">❌ 您的保養禁忌清單：</h4>
        <p>${report.taboo}</p>
    `;

    // --- 敏感肌的獨特疊加模塊 ---
    if (isSensitive) {
        typeDisplay += " - **敏感傾向**";
        htmlContent += `
            <h4 class="sensitive-heading">🚨 深度敏感警示區 (必須遵守)</h4>
            <p><strong>[潛在刺激物]</strong>：建議避開下列常見於配方中的成分，它們是**接觸性敏感**的主因：</p>
            <ul>
                <li>**異噻唑啉酮類 (MI/MCI)**：常見於防腐劑。</li>
                <li>**對羥基苯甲酸酯 (Parabens)**：某些防腐劑。</li>
                <li>**十二烷基硫酸鈉 (SLS)**：強效清潔劑。</li>
                <li>**人造色素 (CI XXXXX)**：純粹的視覺添加物。</li>
            </ul>
            <p><strong>[保養儀式]</strong>：洗臉時水溫必須**接近體溫**或略低，輕拍或按壓方式塗抹保養品，避免任何摩擦或搓揉的動作。</p>
        `;
    }
    
    return { typeDisplay, htmlContent };
}