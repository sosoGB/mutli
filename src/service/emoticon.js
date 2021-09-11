// import Cookie from 'common/js/Cookies'
var fn = (function () {
    var MSG_TYPE_TEXT = 0
    var MSG_TYPE_IMG = 1
    var MSG_TYPE_AUDIO = 2
    var MSG_TYPE_VIDEO = 3
    var MSG_TYPE_FILE = 4
    var MSG_TYPE_MATERIAL = 5
    var MSG_TYPE_EMAIL = 6
    var MSG_TYPE_LINK = 7
    var emojiItems = [{ tip: "[微笑]", src: "100.gif", qqcode: "[B014]", wxcode: "/::)", wbcode: "[微笑]" },
    { tip: "[伤心]", src: "101.gif", qqcode: "[B001]", wxcode: "/::~", wbcode: "" },
    { tip: "[美女]", src: "102.gif", qqcode: "[B002]", wxcode: "/::B", wbcode: "[色]" },
    { tip: "[发呆]", src: "103.gif", qqcode: "[B003]", wxcode: "/::|", wbcode: "[思考]" },
    { tip: "[墨镜]", src: "104.gif", qqcode: "[B004]", wxcode: "/:8-)", wbcode: "[酷]" },
    { tip: "[哭]", src: "105.gif", qqcode: "[B005]", wxcode: "/::<", wbcode: "[泪]" },
    { tip: "[羞]", src: "106.gif", qqcode: "[B006]", wxcode: "/::$", wbcode: "[害羞]" },
    { tip: "[哑]", src: "107.gif", qqcode: "[B007]", wxcode: "/::X", wbcode: "[闭嘴]" },
    { tip: "[睡]", src: "108.gif", qqcode: "[B008]", wxcode: "/::Z", wbcode: "[睡]" },
    { tip: "[大哭]", src: "109.gif", qqcode: "[B009]", wxcode: "/::'(", wbcode: "[泪]" },
    // { tip: "[囧]", src: "110.gif", qqcode: "[B010]", wxcode: "/::-|", wbcode: "[囧]" }, // 取消微博渠道囧表情
    { tip: "[囧]", src: "110.gif", qqcode: "[B010]", wxcode: "/::-|", wbcode: "" },
    { tip: "[怒]", src: "111.gif", qqcode: "[B011]", wxcode: "/::@", wbcode: "[怒]" },
    { tip: "[调皮]", src: "112.gif", qqcode: "[B012]", wxcode: "/::P", wbcode: "" },
    { tip: "[大笑]", src: "113.gif", qqcode: "[B013]", wxcode: "/::D", wbcode: "[嘻嘻]" },
    { tip: "[惊讶]", src: "114.gif", qqcode: "[B000]", wxcode: "/::O", wbcode: "[吃惊]" },
    { tip: "[难过]", src: "115.gif", qqcode: "[B050]", wxcode: "/::(", wbcode: "[悲伤]" },
    { tip: "[酷]", src: "116.gif", qqcode: "[B051]", wxcode: "/::+", wbcode: "[酷]" },
    { tip: "[汗]", src: "117.gif", qqcode: "[B096]", wxcode: "/:--b", wbcode: "[汗]" },
    { tip: "[抓狂]", src: "118.gif", qqcode: "[B053]", wxcode: "/::Q", wbcode: "[抓狂]" },
    { tip: "[吐]", src: "119.gif", qqcode: "[B054]", wxcode: "/::T", wbcode: "[吐]" },
    { tip: "[笑]", src: "120.gif", qqcode: "[B073]", wxcode: "/:,@P", wbcode: "[偷笑]" },
    { tip: "[快乐]", src: "121.gif", qqcode: "[B074]", wxcode: "/:,@-D", wbcode: "[太开心]" },
    { tip: "[奇]", src: "122.gif", qqcode: "[B075]", wxcode: "/::d", wbcode: "[白眼]" },
    { tip: "[傲]", src: "123.gif", qqcode: "[B076]", wxcode: "/:,@o", wbcode: "" },
    { tip: "[饿]", src: "124.gif", qqcode: "[B077]", wxcode: "/::g", wbcode: "[馋嘴]" },
    { tip: "[累]", src: "125.gif", qqcode: "[B078]", wxcode: "/:|-)", wbcode: "[困]" },
    { tip: "[吓]", src: "126.gif", qqcode: "[B055]", wxcode: "/::!", wbcode: "" },
    { tip: "[汗]", src: "127.gif", qqcode: "[B056]", wxcode: "/::L", wbcode: "[汗]" },
    { tip: "[高兴]", src: "128.gif", qqcode: "[B057]", wxcode: "/::>", wbcode: "[哈哈]" },
    { tip: "[闲]", src: "129.gif", qqcode: "[B058]", wxcode: "/::,@", wbcode: "" },
    { tip: "[努力]", src: "130.gif", qqcode: "[B079]", wxcode: "/:,@f", wbcode: "" },
    { tip: "[骂]", src: "131.gif", qqcode: "[B080]", wxcode: "/::-S", wbcode: "[怒骂]" },
    { tip: "[疑问]", src: "132.gif", qqcode: "[B081]", wxcode: "/:?", wbcode: "[疑问]" },
    { tip: "[秘密]", src: "133.gif", qqcode: "[B082]", wxcode: "/:,@x", wbcode: "[嘘]" },
    { tip: "[乱]", src: "134.gif", qqcode: "[B083]", wxcode: "/:,@@", wbcode: "[晕]" },
    { tip: "[疯]", src: "135.gif", qqcode: "[B084]", wxcode: "/::8", wbcode: "[抓狂]" },
    { tip: "[哀]", src: "136.gif", qqcode: "[B085]", wxcode: "/:,@!", wbcode: "[衰]" },
    { tip: "[鬼]", src: "137.gif", qqcode: "[B086]", wxcode: "/:!!!", wbcode: "" },
    { tip: "[打击]", src: "138.gif", qqcode: "[B087]", wxcode: "/:xx", wbcode: "" },
    { tip: "[再见]", src: "139.gif", qqcode: "[B088]", wxcode: "/:bye", wbcode: "[拜拜]" },
    { tip: "[汗]", src: "140.gif", qqcode: "[B097]", wxcode: "/:wipe", wbcode: "[汗]" },
    { tip: "[抠]", src: "141.gif", qqcode: "[B098]", wxcode: "/:dig", wbcode: "[挖鼻]" },
    { tip: "[鼓掌]", src: "142.gif", qqcode: "[B099]", wxcode: "/:handclap", wbcode: "[鼓掌]" },
    { tip: "[糟糕]", src: "143.gif", qqcode: "[B100]", wxcode: "/:&-(", wbcode: "" },
    { tip: "[恶搞]", src: "144.gif", qqcode: "[B101]", wxcode: "/:B-)", wbcode: "[阴险]" },
    { tip: "[左哼哼]", src: "145.gif", qqcode: "[B102]", wxcode: "/:<@", wbcode: "[左哼哼]" },
    { tip: "[右哼哼]", src: "146.gif", qqcode: "[B103]", wxcode: "/:@>", wbcode: "[右哼哼]" },
    { tip: "[哈欠]", src: "147.gif", qqcode: "[B104]", wxcode: "/::-O", wbcode: "[哈欠]" },
    { tip: "[看]", src: "148.gif", qqcode: "[B105]", wxcode: "/:>-|", wbcode: "[鄙视]" },
    { tip: "[委屈]", src: "149.gif", qqcode: "[B106]", wxcode: "/:P-(", wbcode: "[委屈]" },
    { tip: "[快哭]", src: "150.gif", qqcode: "[B107]", wxcode: "/::'|", wbcode: "[失望]" },
    { tip: "[坏]", src: "151.gif", qqcode: "[B108]", wxcode: "/:X-)", wbcode: "[坏笑]" },
    { tip: "[亲]", src: "152.gif", qqcode: "[B109]", wxcode: "/::*", wbcode: "[亲亲]" },
    { tip: "[吓]", src: "153.gif", qqcode: "[B110]", wxcode: "/:@x", wbcode: "[黑线]" },
    { tip: "[可怜]", src: "154.gif", qqcode: "[B111]", wxcode: "/:8*", wbcode: "[可怜]" },
    { tip: "[刀]", src: "155.gif", qqcode: "[B112]", wxcode: "/:pd", wbcode: "" },
    { tip: "[水果]", src: "156.gif", qqcode: "[B032]", wxcode: "/:<W>", wbcode: "" },
    { tip: "[酒]", src: "157.gif", qqcode: "[B113]", wxcode: "/:beer", wbcode: "" },
    { tip: "[篮球]", src: "158.gif", qqcode: "[B114]", wxcode: "/:basketb", wbcode: "" },
    { tip: "[乒乓]", src: "159.gif", qqcode: "[B115]", wxcode: "/:oo", wbcode: "" },
    { tip: "[咖啡]", src: "160.gif", qqcode: "[B063]", wxcode: "/:coffee", wbcode: "" },
    { tip: "[美食]", src: "161.gif", qqcode: "[B064]", wxcode: "/:eat", wbcode: "" },
    { tip: "[动物]", src: "162.gif", qqcode: "[B059]", wxcode: "/:pig", wbcode: "[猪头]" },
    { tip: "[鲜花]", src: "163.gif", qqcode: "[B033]", wxcode: "/:rose", wbcode: "" },
    { tip: "[枯]", src: "164.gif", qqcode: "[B034]", wxcode: "/:fade", wbcode: "" },
    { tip: "[唇]", src: "165.gif", qqcode: "[B116]", wxcode: "/:showlove", wbcode: "" },
    { tip: "[爱]", src: "166.gif", qqcode: "[B036]", wxcode: "/:heart", wbcode: "[心]" },
    { tip: "[分手]", src: "167.gif", qqcode: "[B037]", wxcode: "/:break", wbcode: "[伤心]" },
    { tip: "[生日]", src: "168.gif", qqcode: "[B038]", wxcode: "/:cake", wbcode: "[蛋糕]" },
    { tip: "[电]", src: "169.gif", qqcode: "[B091]", wxcode: "/:li", wbcode: "" },
    { tip: "[炸弹]", src: "170.gif", qqcode: "[B092]", wxcode: "/:bome", wbcode: "" },
    { tip: "[刀子]", src: "171.gif", qqcode: "[B093]", wxcode: "/:kn", wbcode: "" },
    { tip: "[足球]", src: "172.gif", qqcode: "[B029]", wxcode: "/:footb", wbcode: "" },
    { tip: "[瓢虫]", src: "173.gif", qqcode: "[B117]", wxcode: "/:ladybug", wbcode: "" },
    { tip: "[翔]", src: "174.gif", qqcode: "[B072]", wxcode: "/:shit", wbcode: "" },
    { tip: "[月亮]", src: "175.gif", qqcode: "[B045]", wxcode: "/:moon", wbcode: "" },
    { tip: "[太阳]", src: "176.gif", qqcode: "[B042]", wxcode: "/:sun", wbcode: "" },
    { tip: "[礼物]", src: "177.gif", qqcode: "[B039]", wxcode: "/:gift", wbcode: "" },
    { tip: "[抱抱]", src: "178.gif", qqcode: "[B062]", wxcode: "/:hug", wbcode: "[抱抱]" },
    { tip: "[拇指]", src: "179.gif", qqcode: "[B046]", wxcode: "/:strong", wbcode: "[good]" },
    { tip: "[贬低]", src: "180.gif", qqcode: "[B047]", wxcode: "/:weak", wbcode: "[弱]" },
    { tip: "[握手]", src: "181.gif", qqcode: "[B071]", wxcode: "/:share", wbcode: "" },
    { tip: "[剪刀手]", src: "182.gif", qqcode: "[B095]", wxcode: "/:v", wbcode: "[耶]" },
    { tip: "[抱拳]", src: "183.gif", qqcode: "[B118]", wxcode: "/:@)", wbcode: "" },
    { tip: "[勾引]", src: "184.gif", qqcode: "[B119]", wxcode: "/:jj", wbcode: "[来]" },
    { tip: "[拳头]", src: "185.gif", qqcode: "[B120]", wxcode: "/:@@", wbcode: "" },
    { tip: "[小拇指]", src: "186.gif", qqcode: "[B121]", wxcode: "/:bad", wbcode: "" },
    { tip: "[拇指八]", src: "187.gif", qqcode: "[B122]", wxcode: "/:lvu", wbcode: "" },
    { tip: "[食指]", src: "188.gif", qqcode: "[B123]", wxcode: "/:no", wbcode: "[NO]" },
    { tip: "[ok]", src: "189.gif", qqcode: "[B124]", wxcode: "/:ok", wbcode: "[ok]" },
    { tip: "[情侣]", src: "190.gif", qqcode: "[B027]", wxcode: "/:love", wbcode: "" },
    { tip: "[爱心]", src: "191.gif", qqcode: "[B021]", wxcode: "/:<L>", wbcode: "" },
    { tip: "[蹦哒]", src: "192.gif", qqcode: "[B023]", wxcode: "/:jump", wbcode: "" },
    { tip: "[颤抖]", src: "193.gif", qqcode: "[B025]", wxcode: "/:shake", wbcode: "" },
    { tip: "[怄气]", src: "194.gif", qqcode: "[B026]", wxcode: "/:<O>", wbcode: "" },
    { tip: "[跳舞]", src: "195.gif", qqcode: "[B125]", wxcode: "/:circle", wbcode: "" },
    { tip: "[叩头]", src: "196.gif", qqcode: "[B126]", wxcode: "/:kotow", wbcode: "" },
    { tip: "[背着]", src: "197.gif", qqcode: "[B127]", wxcode: "/:turn", wbcode: "" },
    { tip: "[伸手]", src: "198.gif", qqcode: "[B128]", wxcode: "/:skip", wbcode: "" },
    { tip: "[耍帅]", src: "199.gif", qqcode: "[B129]", wxcode: "/:oY", wbcode: "" },
    // { tip: "[吃惊]", src: "200.gif", qqcode: "", wxcode: "", wbcode: "[吃惊]" },
    // { tip: "[污]", src: "202.png", qqcode: "", wxcode: "", wbcode: "[污]" },
    // // { tip: "[挤眼]", src: "203.gif", qqcode: "", wxcode: "", wbcode: "[挤眼]" },
    // // { tip: "[失望]", src: "204.gif", qqcode: "", wxcode: "", wbcode: "[失望]" },
    // // { tip: "[舔屏]", src: "205.png", qqcode: "", wxcode: "", wbcode: "[舔屏]" },
    // { tip: "[可爱]", src: "206.gif", qqcode: "", wxcode: "", wbcode: "[可爱]" },
    // { tip: "[允悲]", src: "207.png", qqcode: "", wxcode: "", wbcode: "[允悲]" },
    // { tip: "[笑而不语]", src: "208.png", qqcode: "", wxcode: "", wbcode: "[笑而不语]" },
    // { tip: "[费解]", src: "209.png", qqcode: "", wxcode: "", wbcode: "[费解]" },
    // { tip: "[憧憬]", src: "210.png", qqcode: "", wxcode: "", wbcode: "[憧憬]" },
    // { tip: "[并不简单]", src: "211.png", qqcode: "", wxcode: "", wbcode: "[并不简单]" },
    // { tip: "[爱你]", src: "214.gif", qqcode: "", wxcode: "", wbcode: "[爱你]" },
    // { tip: "[生病]", src: "218.gif", qqcode: "", wxcode: "", wbcode: "[生病]" },
    // { tip: "[钱]", src: "237.gif", qqcode: "", wxcode: "", wbcode: "[钱]" },
    // { tip: "[哼]", src: "241.gif", qqcode: "", wxcode: "", wbcode: "[哼]" },
    // { tip: "[互粉]", src: "249.gif", qqcode: "", wxcode: "", wbcode: "[互粉]" },
    // { tip: "[熊猫]", src: "253.gif", qqcode: "", wxcode: "", wbcode: "[熊猫]" },
    // { tip: "[兔子]", src: "254.gif", qqcode: "", wxcode: "", wbcode: "[兔子]" },
    // { tip: "[赞]", src: "259.gif", qqcode: "", wxcode: "", wbcode: "[赞]" },
    // { tip: "[草泥马]", src: "262.gif", qqcode: "", wxcode: "", wbcode: "[草泥马]" },
    // // { tip: "[神马]", src: "263.gif", qqcode: "", wxcode: "", wbcode: "[神马]" },     // 取消微博渠道神马表情
    // { tip: "[神马]", src: "263.gif", qqcode: "", wxcode: "", wbcode: "" },
    // { tip: "[浮云]", src: "265.gif", qqcode: "", wxcode: "", wbcode: "[浮云]" },
    // { tip: "[给力]", src: "266.gif", qqcode: "", wxcode: "", wbcode: "[给力]" },
    // { tip: "[围观]", src: "267.gif", qqcode: "", wxcode: "", wbcode: "[围观]" },
    // { tip: "[威武]", src: "268.gif", qqcode: "", wxcode: "", wbcode: "[威武]" },
    // { tip: "[话筒]", src: "269.gif", qqcode: "", wxcode: "", wbcode: "[话筒]" },
    // { tip: "[蜡烛]", src: "270.gif", qqcode: "", wxcode: "", wbcode: "[蜡烛]" }
    ];

    var qdEmoji = [
        {tip: "[惊讶]", code:"[B000]", src:"B000.png"},
        {tip: "[撇嘴]", code:"[B001]", src:"B001.png"},
        {tip: "[色]",   code:"[B002]", src:"B002.png"},
        {tip: "[发呆]", code:"[B003]", src:"B003.png"},
        {tip: "[得意]", code:"[B004]", src:"B004.png"},
        {tip: "[流泪]", code:"[B005]", src:"B005.png"},
        {tip: "[害羞]", code:"[B006]", src:"B006.png"},
        {tip: "[闭嘴]", code:"[B007]", src:"B007.png"},
        {tip: "[睡]",   code:"[B008]", src:"B008.png"},
        {tip: "[大哭]", code:"[B009]", src:"B009.png"},
        {tip: "[尴尬]", code:"[B010]", src:"B010.png"},
        {tip: "[怒]",   code:"[B011]", src:"B011.png"},
        {tip: "[调皮]", code:"[B012]", src:"B012.png"},
        {tip: "[呲牙]", code:"[B013]", src:"B013.png"},
        {tip: "[微笑]", code:"[B014]", src:"B014.png"},
        {tip: "[难过]", code:"[B015]", src:"B015.png"},
        {tip: "[酷]",   code:"[B016]", src:"B016.png"},
        {tip: "[抓狂]", code:"[B018]", src:"B018.png"},
        {tip: "[吐]",   code:"[B019]", src:"B019.png"},
        {tip: "[偷笑]", code:"[B020]", src:"B020.png"},
        {tip: "[可爱]", code:"[B021]", src:"B021.png"},
        {tip: "[白眼]", code:"[B022]", src:"B022.png"},
        {tip: "[傲慢]", code:"[B023]", src:"B023.png"},
        {tip: "[饥饿]", code:"[B024]", src:"B024.png"},
        {tip: "[困]",   code:"[B025]", src:"B025.png"},
        {tip: "[惊恐]", code:"[B026]", src:"B026.png"},
        {tip: "[汗]",   code:"[B027]", src:"B027.png"},
        {tip: "[憨笑]", code:"[B028]", src:"B028.png"},
        {tip: "[大兵]", code:"[B029]", src:"B029.png"},
        {tip: "[奋斗]", code:"[B030]", src:"B030.png"},
        {tip: "[咒骂]", code:"[B031]", src:"B031.png"},
        {tip: "[疑问]", code:"[B032]", src:"B032.png"},
        {tip: "[嘘]",   code:"[B033]", src:"B033.png"},
        {tip: "[晕]",   code:"[B034]", src:"B034.png"},
        {tip: "[折磨]", code:"[B035]", src:"B035.png"},
        {tip: "[衰]",   code:"[B036]", src:"B036.png"},
        {tip: "[骷髅]", code:"[B037]", src:"B037.png"},
        {tip: "[敲打]", code:"[B038]", src:"B038.png"},
        {tip: "[再见]", code:"[B039]", src:"B039.png"},
        {tip: "[发抖]", code:"[B041]", src:"B041.png"},
        {tip: "[爱情]", code:"[B042]", src:"B042.png"},
        {tip: "[跳跳]", code:"[B043]", src:"B043.png"},
        {tip: "[猪头]", code:"[B046]", src:"B046.png"},
        {tip: "[拥抱]", code:"[B049]", src:"B049.png"},
        {tip: "[蛋糕]", code:"[B053]", src:"B053.png"},
        {tip: "[闪电]", code:"[B054]", src:"B054.png"},
        {tip: "[炸弹]", code:"[B055]", src:"B055.png"},
        {tip: "[刀]",   code:"[B056]", src:"B056.png"},
        {tip: "[足球]", code:"[B057]", src:"B057.png"},
        {tip: "[大便]", code:"[B059]", src:"B059.png"},
        {tip: "[咖啡]", code:"[B060]", src:"B060.png"},
        {tip: "[饭]",   code:"[B061]", src:"B061.png"},
        {tip: "[玫瑰]", code:"[B063]", src:"B063.png"},
        {tip: "[凋谢]", code:"[B064]", src:"B064.png"},
        {tip: "[爱心]", code:"[B066]", src:"B066.png"},
        {tip: "[心碎]", code:"[B067]", src:"B067.png"},
        {tip: "[礼物]", code:"[B069]", src:"B069.png"},
        {tip: "[太阳]", code:"[B074]", src:"B074.png"},
        {tip: "[月亮]", code:"[B075]", src:"B075.png"},
        {tip: "[强]",   code:"[B076]", src:"B076.png"},
        {tip: "[弱]",   code:"[B077]", src:"B077.png"},
        {tip: "[握手]", code:"[B078]", src:"B078.png"},
        {tip: "[胜利]", code:"[B079]", src:"B079.png"},
        {tip: "[飞吻]", code:"[B085]", src:"B085.png"},
        {tip: "[无视]", code:"[B086]", src:"B086.png"},
        {tip: "[西瓜]", code:"[B089]", src:"B089.png"},
        {tip: "[擦汗]", code:"[B097]", src:"B097.png"},
        {tip: "[抠鼻]", code:"[B098]", src:"B098.png"},
        {tip: "[鼓掌]", code:"[B099]", src:"B099.png"},
        {tip: "[糗大了]", code:"[B100]", src:"B100.png"},
        {tip: "[坏笑]", code:"[B101]", src:"B101.png"},
        {tip: "[左哼哼]", code:"[B102]", src:"B102.png"},
        {tip: "[右哼哼]", code:"[B103]", src:"B103.png"},
        {tip: "[哈欠]", code:"[B104]", src:"B104.png"},
        {tip: "[鄙视]", code:"[B105]", src:"B105.png"},
        {tip: "[委屈]", code:"[B106]", src:"B106.png"},
        {tip: "[快哭了]", code:"[B107]", src:"B107.png"},
        {tip: "[阴险]", code:"[B108]", src:"B108.png"},
        {tip: "[亲亲]", code:"[B109]", src:"B109.png"},
        {tip: "[吓]",   code:"[B110]", src:"B110.png"},
        {tip: "[可怜]", code:"[B111]", src:"B111.png"},
        {tip: "[菜刀]", code:"[B112]", src:"B112.png"},
        {tip: "[啤酒]", code:"[B113]", src:"B113.png"},
        {tip: "[篮球]", code:"[B114]", src:"B114.png"},
        {tip: "[乒乓]", code:"[B115]", src:"B115.png"},
        {tip: "[吻]",   code:"[B116]", src:"B116.png"},
        {tip: "[瓢虫]", code:"[B117]", src:"B117.png"},
        {tip: "[抱拳]", code:"[B118]", src:"B118.png"},
        {tip: "[勾引]", code:"[B119]", src:"B119.png"},
        {tip: "[拳头]", code:"[B120]", src:"B120.png"},
        {tip: "[差劲]", code:"[B121]", src:"B121.png"},
        {tip: "[爱你]", code:"[B122]", src:"B122.png"},
        {tip: "[NO]",   code:"[B123]", src:"B123.png"},
        {tip: "[OK]",   code:"[B124]", src:"B124.png"},
        {tip: "[转圈]", code:"[B125]", src:"B125.png"},
        {tip: "[磕头]", code:"[B126]", src:"B126.png"},
        {tip: "[回头]", code:"[B127]", src:"B127.png"},
        {tip: "[跳绳]", code:"[B128]", src:"B128.png"},
        {tip: "[挥手]", code:"[B129]", src:"B129.png"},
        {tip: "[激动]", code:"[B130]", src:"B130.png"},
        {tip: "[街舞]", code:"[B131]", src:"B131.png"},
        {tip: "[献吻]", code:"[B132]", src:"B132.png"},
        {tip: "[左太极]", code:"[B133]", src:"B133.png"},
        {tip: "[右太极]", code:"[B134]", src:"B134.png"},
        {tip: "[双喜]", code:"[B136]", src:"B136.png"},
        {tip: "[鞭炮]", code:"[B137]", src:"B137.png"},
        {tip: "[灯笼]", code:"[B138]", src:"B138.png"},
        {tip: "[K歌]",  code:"[B140]", src:"B140.png"},
        {tip: "[喝彩]", code:"[B144]", src:"B144.png"},
        {tip: "[祈祷]", code:"[B145]", src:"B145.png"},
        {tip: "[爆筋]", code:"[B146]", src:"B146.png"},
        {tip: "[棒棒糖]", code:"[B147]", src:"B147.png"},
        {tip: "[喝奶]", code:"[B148]", src:"B148.png"},
        {tip: "[飞机]", code:"[B151]", src:"B151.png"},
        {tip: "[钞票]", code:"[B158]", src:"B158.png"},
        {tip: "[药丸]", code:"[B168]", src:"B168.png"},
        {tip: "[手枪]", code:"[B169]", src:"B169.png"},
        {tip: "[下面]", code:"[B171]", src:"B171.png"},
        {tip: "[泪奔]", code:"[B173]", src:"B173.png"},
        {tip: "[无奈]", code:"[B174]", src:"B174.png"},
        {tip: "[酸]",   code:"[B175]", src:"B175.png"},
        {tip: "[苦笑]", code:"[B176]", src:"B176.png"},
        {tip: "[喷血]", code:"[B177]", src:"B177.png"},
        {tip: "[滑稽]", code:"[B178]", src:"B178.png"},
        {tip: "[蔑视]", code:"[B179]", src:"B179.png"},
        {tip: "[惬意]", code:"[B180]", src:"B180.png"},
        {tip: "[扑克脸]", code:"[B181]", src:"B181.png"},
        {tip: "[笑哭]", code:"[B182]", src:"B182.png"},
        {tip: "[卖萌]", code:"[B183]", src:"B183.png"},
        {tip: "[螃蟹]", code:"[B184]", src:"B184.png"},
        {tip: "[草泥马]", code:"[B185]", src:"B185.png"},
        {tip: "[栗子]", code:"[B186]", src:"B186.png"},
        {tip: "[幽灵]", code:"[B187]", src:"B187.png"},
        {tip: "[鸡蛋]", code:"[B188]", src:"B188.png"},
        {tip: "[魔方]", code:"[B189]", src:"B189.png"},
        {tip: "[菊花]", code:"[B190]", src:"B190.png"},
        {tip: "[肥皂]", code:"[B191]", src:"B191.png"},
        {tip: "[红包]", code:"[B192]", src:"B192.png"},
        {tip: "[冷汗]", code:"[B096]", src:"B096.png"},
        {tip: "[托腮]", code:"[B212]", src:"B212.png"},
        {tip: "[大笑]", code:"[B193]", src:"B193.png"},
        {tip: "[不开心]", code:"[B194]", src:"B194.png"},
        {tip: "[冷漠]", code:"[B197]", src:"B197.png"},
        {tip: "[呃]", code:"[B198]", src:"B198.png"},
        {tip: "[好棒]", code:"[B199]", src:"B199.png"},
        {tip: "[拜托]", code:"[B200]", src:"B200.png"},
        {tip: "[点赞]", code:"[B201]", src:"B201.png"},
        {tip: "[无聊]", code:"[B202]", src:"B202.png"},
        {tip: "[托脸]", code:"[B203]", src:"B203.png"},
        {tip: "[吃]", code:"[B204]", src:"B204.png"},
        {tip: "[送花]", code:"[B205]", src:"B205.png"},
        {tip: "[害怕]", code:"[B206]", src:"B206.png"},
        {tip: "[花痴]", code:"[B207]", src:"B207.png"},
        {tip: "[小样儿]", code:"[B208]", src:"B208.png"},
        {tip: "[飙泪]", code:"[B210]", src:"B210.png"},
        {tip: "[我不看]", code:"[B211]", src:"B211.png"},
        {tip: "[眨眼睛]", code:"[B172]", src:"B172.png"},
    ]

    var emojiItemArr = (function () {
        var result = emojiItems;
        var qqEmojiItemArr = [],
            wxEmojiItemArr = [],
            wbEmojiItemArr = [],
            allEmojiItemArr = [],
            qdEmojiItemArr = [];
        result.forEach(function (item) {
            // item.src = "static/img/emoji/" + item.src;
            // item.src = "../../assets/image/emoji/" + item.src;
            item.staticSrc = item.src.replace('gif','png')
            if (item.wbcode != '') {
                wbEmojiItemArr.push(item);
            }
            if (item.qqcode != '') {
                qqEmojiItemArr.push(item)
            }
            if (item.wxcode != '') {
                wxEmojiItemArr.push(item)
            }
        });
        qdEmoji.forEach(function(item) {
            item.src = "static/img/qdemoji/" + item.src;
            qdEmojiItemArr.push(item)
        });
        return {
            qqEmojiItemArr,
            wxEmojiItemArr,
            wbEmojiItemArr,
            qdEmojiItemArr
        }
    })();

    function showQDEmojiMsg(msg) {
        var show_msg = msg;
        for (var i=0; i<qdEmoji.length; i++) {
            var regCode = qdEmoji[i].code.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
            var reg = new RegExp(regCode, "g");
            show_msg = show_msg.replace(reg, "<img class='wechat-emoji' src='" + qdEmoji[i].src + "' />");
        }
        return show_msg;
    }

    function showEmojiMsg(type, msg) {
        var self = this;
        var show_msg = msg;
        for (var i = 0; i < emojiItems.length; i++) {
            if (type == 161 || type == 132 || type == 169 ||type == 166) {
                if (emojiItems[i].wxcode) {
                    var regCode = emojiItems[i].wxcode.replace(/\)/g, "\\)").replace(/\~/g, "\\~").replace(/\|/g, "\\|")
                        .replace(/\&/g, "\\&").replace(/\*/g, "\\*").replace(/\(/g, "\\(").replace(/\</g, "\\<").replace(/\>/g, "\\>").replace(/\@/g, "\\@").replace(/\!/g, "\\!")
                        .replace(/\-/g, "\\-").replace(/\+/g, "\\+").replace(/\?/g, "\\?").replace(/\$/g, "\\$");
                    var reg = new RegExp(regCode, "g");
                    show_msg = show_msg.replace(reg, "<img class='wechat-emoji' src='" + emojiItems[i].src + "' />");
                }
            }
            if (type == 1 || type == 4 || type == 163 || type == 164) {
                if (emojiItems[i].qqcode) {
                    var regCode = emojiItems[i].qqcode.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
                    var reg = new RegExp(regCode, "g");
                    show_msg = show_msg.replace(reg, "<img class='wechat-emoji' src='" + emojiItems[i].src + "' />");
                }
            }
            if (type == 101 || type == 102 || type == 165) {
                if (emojiItems[i].wbcode) {
                    var regCode = emojiItems[i].wbcode.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
                    var reg = new RegExp(regCode, "g");
                    show_msg = show_msg.replace(reg, "<img class='wechat-emoji' src='" + emojiItems[i].src + "' />");
                }
            }
        }
        return show_msg;
    }

    // function replaceUrlText(msg,from) {
    //     var reg_url = /((http|ftp|https):\/\/)[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/g;
    //     return msg.replace(reg_url, function (match) {
    //         if (match.indexOf(Cookie.userInfo.downloadUrl) >= 0) {
    //             var i = match.lastIndexOf("/");
    //             var fname = match.substring(i + 1);
    //             return '<span class="file"><i class="icon icon-folder fl"></i><span class="fl">' +
    //                 '<a style="color:blue;" href="' + match + '" download="' + fname + '">' + fname + '</a>' +
    //                 '</span></span>';
    //         } else {
    //             return "<a class='urlText' href='" + match + "' target='_blank'>" + match + "</a>";
    //         }
    //     });
    // }

    // function processPlainText(msg, from) {
    //     var result = replaceUrlText(msg,from);
    //     if (from == 5) {
    //         result = showQDEmojiMsg(result);
    //     } else {
    //         result = showEmojiMsg(from, result);
    //     }
    //     if (result.indexOf("src=") > -1|| result.indexOf("href=") > -1 || result.indexOf('url') > -1 || /\n/.test(result)) {
    //         return { type: MSG_TYPE_LINK, content: result.replace(/\n/g, "<br>") };
    //     } 
    //     return { type: MSG_TYPE_TEXT, content: result };
    // }

    // function processWxImg(msg,from) {
    //     var reg_wx_img = /<weixin><img>.+?<\/img><\/weixin>/g;
    //     var result = [], url;
    //     var imgs = msg.match(reg_wx_img);
    //     var texts = msg.split(reg_wx_img);
    //     // if(msg.indexOf('http://')>0){
    //     //     url =  imgs[0].replace(/<weixin><img>/g, "").replace(/<\/img><\/weixin>/g, "")
    //     // }else{
    //     //     url=Cookie.userInfo.downloadUrl + imgs[0].replace(/<weixin><img>/g, "").replace(/<\/img><\/weixin>/g, "")
    //     // }
    //     // result.push({ type: MSG_TYPE_IMG, content: texts, url: url })
    //     //     for (var i = 0; i < texts.length; i++) {
    //     //         if (texts[i]) {
    //     //             result.push(processPlainText(texts[i], 161));
    //     //         }
    //     //         if (i < imgs.length && imgs[i]) {
    //     //             result.push({ type: MSG_TYPE_IMG, content: window.serverConfig.downloadUrl + imgs[i].replace(/<weixin><img>/g, "").replace(/<\/img><\/weixin>/g, "") });
    //     //         }
    //     //     }
    //     //     console.log(result)

    //     for (var i = 0; i < texts.length; i++) {
    //         if (texts[i]) {
    //             result.push(processPlainText(texts[i], from));
    //         }
    //         if (i < imgs.length && imgs[i]) {
    //             var path = imgs[i].replace(/<weixin><img>/g, "").replace(/<\/img><\/weixin>/g, "");
    //             if (path.indexOf("http") != 0) {
    //                 path = Cookie.userInfo.downloadUrl + path;
    //             }
    //             result.push({ type: MSG_TYPE_IMG, content: path });
    //         }
    //     }
    //     return result;
    // }

    // function processWxVoice(msg) {
    //     var content = msg.replace(/<weixin><voice>/g, "").replace(/<\/voice><\/weixin>/g, "");
    //     if (content.indexOf(".mp3") >= 0) {
    //         return [{ type: MSG_TYPE_AUDIO, content: Cookie.userInfo.downloadUrl + content }];
    //     } else {
    //         return [{ type: MSG_TYPE_AUDIO, content: Cookie.userInfo.downloadUrl + content + ".mp3" }];
    //     }

    // }

    // function processWxVideo(msg) {
    //     var content = msg.replace(/<weixin><video>/g, "").replace(/<\/video><\/weixin>/g, "");
    //     return [{ type: MSG_TYPE_VIDEO, content: Cookie.userInfo.downloadUrl + content }];
    // }

    // function processWxFile(msg) {
    //     var result = [];
    //     var reg_wx_file = /<weixin><file>(.+)<\/file><name>(.+)<\/name><\/weixin>/g;
    //     var arr = msg.split(reg_wx_file);
    //     if (arr[0]) {
    //         result.push({ type: MSG_TYPE_TEXT, content: arr[0] });
    //     }
    //     for (var i = 1; i < arr.length; i = i + 3) {
    //         var url = arr[i];
    //         if (url.indexOf("http") != 0) {
    //             url = Cookie.userInfo.downloadUrl + arr[i]
    //         }
    //         var index = arr[i + 1].lastIndexOf(".")
    //         var suffix = arr[i + 1].substring(index+1)
    //         result.push({ type: MSG_TYPE_FILE, content: url, name: arr[i + 1],fileType:suffix });
    //         if (arr[i + 2]) {
    //             result.push({ type: MSG_TYPE_TEXT, content: arr[i + 2] });
    //         }
    //     }
    //     return result;
    // }

    function processMaterial(msg) {
        // msg = msg.replace(/<!\[\CDATA\[/g, '').replace(/\]\]\>/g,"")
        // msg = '<xml><Articles>'+msg+'</Articles></xml>'
        // msg = msg.replace(/&/g,'&amp;')
        // var xTjs = new XmlTojs()
        // var xmlData = xTjs.xml_str2json(msg)
        // console.log(xmlData)
        // var json = toJson(parseXML(msg))
        // console.log(msg)
        // try {
        //     var aa=xmlToJson(parseXML(msg))
        //     console.log(JSON.stringify(aa))
        //     if (!aa.xml.Articles) return
        //     return [{ type: MSG_TYPE_MATERIAL, content: bb }];
        // } catch (error) {
        //     console.log(error)
        // }
        return [{ type: MSG_TYPE_MATERIAL, content: msg }];
        // var regex = /<yx>text<\/yx><Articles><item><Title><!\[CDATA\[(.+?)\]\]><\/Title>.+?<\/Articles>/g;
        // var arr = msg.split(regex);
        // var content = arr[1];
        // return [{ type: MSG_TYPE_MATERIAL, content: content }];
    }

    // function processQQImg(msg) {
    //     var reg_qq_img = /\/\{.{36}\}[0-9]*\.jpg/g;
    //     var result = [];
    //     var imgs = msg.match(reg_qq_img);
    //     var texts = msg.split(reg_qq_img);
    //     for (var i = 0; i < texts.length; i++) {
    //         if (texts[i]) {
    //             result.push(processPlainText(texts[i], 1));
    //         }
    //         if (i < imgs.length && imgs[i]) {
    //             result.push({ type: MSG_TYPE_IMG, content: window.serverConfig.qqImageAddr + "Down/" + imgs[i].replace(/\/\{/g, "").replace(/\}/g, "").replace(/-/g, "") });
    //         }
    //     }
    //     return result;
    // }

    // function processEmail(msg) {
    //     msg = msg.replace(/\n/g, "<br>");
    //     var result = [];
    //     var reg_email = /<weixin><html>(.+?)<\/html><name>(.*?)<\/name><\/weixin>/g;
    //     var arr = msg.split(reg_email);
    //     var content = arr[1];
    //     var title = arr[2];
    //     var rest = arr[3];
    //     var tmp = rest.split(/<weixin><file>.+<\/file><name>.+<\/name><\/weixin>/g);
    //     if(tmp && tmp.length>0 && tmp[tmp.length-1]) {
    //         title = tmp[tmp.length-1];
    //         if(title.length>200) {
    //             title = title.substr(0, 200) + "...";
    //         }
    //     }

    //     // var attaches = processWxFile(rest);
    //     // if (attaches && attaches.length > 0) {
    //     //     var tmp = attaches[attaches.length - 1];
    //     //     if (tmp && tmp.content) title = tmp.content.substr(0, 200) + "...";
    //     // }

    //     var reg_wx_file = /<weixin><file>.+<\/file><name>.+<\/name><\/weixin>/g;
    //     if (reg_wx_file.test(rest)) {
    //         title = title + "【附件】";
    //     }
    //     result.push({ type: MSG_TYPE_EMAIL, name: title, content: Cookie.userInfo.downloadUrl + content });
    //     return result;
    // }

//     function process(msg, from) {
//         // if (msg) {
//         //     try {
//         //         msg = decodeURIComponent(msg)
//         //     } catch (error) {
//         //         console.log(msg)
//         //     }
//         // }
//         msg = msg.replace(/\r/g, "\n");
//         var reg_wx_img = /<weixin><img>.+<\/img><\/weixin>/g;
//         var reg_wx_voice = /<weixin><voice>.+<\/voice><\/weixin>/g;
//         var reg_wx_video = /<weixin><video>.+<\/video><\/weixin>/g;
//         var reg_wx_file = /<weixin><file>.+<\/file><name>.+<\/name><\/weixin>/g;
//         var reg_qq_img = /\/\{.{36}\}[0-9]*\.jpg/g;
//         var reg_material = /<yx>.+?<\/yx><Articles><item><Title><!\[CDATA\[(.+?)\]\]><\/Title>.+<\/Articles>/g;
//         // var reg_material = /<yx>.+?<\/yx><Articles>(.+?)<\/Articles>/g
//         var reg_satify = /<yx>.+?<\/yx><Articles><item><Title><!\[CDATA\[服务评价\]\]><\/Title>.+<\/Articles>/g
//         var reg_location = /<Articles><item><Title><!\[CDATA\[(.+?)\]\]><\/Title>.+<\/Articles>/g;
//         var reg_email = /<weixin><html>(.+?)<\/html><name>(.*?)<\/name><\/weixin>/g;
//         if (reg_email.test(msg)) {
//             return processEmail(msg);
//         }
//         if (reg_wx_video.test(msg)) {
//             return processWxVideo(msg);
//         }
//         if (reg_wx_voice.test(msg)) {
//             return processWxVoice(msg);
//         }
//         if (reg_wx_file.test(msg)) {
//             return processWxFile(msg);
//         }
//         if (reg_wx_img.test(msg)) {
//             return processWxImg(msg,from);
//         }
//         if (reg_qq_img.test(msg)) {
//             return processQQImg(msg);
//         }
//         if (reg_satify.test(msg)) {
//             return [{ type: MSG_TYPE_TEXT, content: '已向用户推送满意度' }]
//         }
//         if (reg_material.test(msg)) {
//             return processMaterial(msg);
//         }
//         if (reg_location.test(msg)) {
//             msg = '<yx></yx>' + msg
//             return processMaterial(msg);
//         }
//         var result = [];
//         result.push(processPlainText(msg, from));
//         return result;
//     }
    return {
        emojiItemArr: emojiItemArr,
        showEmojiMsg: showEmojiMsg,
        // process: process
    }
})();

// function parseXML(data) {  
//     var xml, tmp;  
//   if (window.DOMParser) { // Standard   
//     tmp = new DOMParser();  
//     xml = tmp.parseFromString(data, "text/xml");  
//   } else { // IE   
//     xml = new ActiveXObject("Microsoft.XMLDOM");  
//     xml.async = "false";  
//     xml.loadXML(data);  
//   }  
//   tmp = xml.documentElement;  
//   if (!tmp || !tmp.nodeName || tmp.nodeName === "parsererror") {  
//     return null;  
//   }  
//   return xml;  
// }

// function toJson(obj) {  
//     if (this == null) return null;  
//     var retObj = new Object();  
//     buildObjectNode(retObj,  
//       /*jQuery*/  
//       obj);  
//     return retObj;  
//     function buildObjectNode(cycleOBJ,  
//       /*Element*/  
//       elNode) {  
//       /*NamedNodeMap*/  
//       var nodeAttr = elNode.attributes;  
//       if (nodeAttr != null) {  
//         if (nodeAttr.length && cycleOBJ == null) cycleOBJ = new Object();  
//         for (var i = 0; i < nodeAttr.length; i++) {  
//           cycleOBJ[nodeAttr[i].name] = nodeAttr[i].value;  
//         }  
//       }  
//       var nodeText = "text";  
//       if (elNode.text == null) nodeText = "textContent";  
//       /*NodeList*/  
//       var nodeChilds = elNode.childNodes;  
//       if (nodeChilds != null) {  
//         if (nodeChilds.length && cycleOBJ == null) cycleOBJ = new Object();  
//         for (var i = 0; i < nodeChilds.length; i++) {  
//           if (nodeChilds[i].tagName != null) {  
//             if (nodeChilds[i].childNodes[0] != null && nodeChilds[i].childNodes.length <= 1 && (nodeChilds[i].childNodes[0].nodeType == 3 || nodeChilds[i].childNodes[0].nodeType == 4)) {  
//               if (cycleOBJ[nodeChilds[i].tagName] == null) {  
//                 cycleOBJ[nodeChilds[i].tagName] = nodeChilds[i][nodeText];  
//               } else {  
//                 if (typeof(cycleOBJ[nodeChilds[i].tagName]) == "object" && cycleOBJ[nodeChilds[i].tagName].length) {  
//                   cycleOBJ[nodeChilds[i].tagName][cycleOBJ[nodeChilds[i].tagName].length] = nodeChilds[i][nodeText];  
//                 } else {  
//                   cycleOBJ[nodeChilds[i].tagName] = [cycleOBJ[nodeChilds[i].tagName]];  
//                   cycleOBJ[nodeChilds[i].tagName][1] = nodeChilds[i][nodeText];  
//                 }  
//               }  
//             } else {  
//               if (nodeChilds[i].childNodes.length) {  
//                 if (cycleOBJ[nodeChilds[i].tagName] == null) {  
//                   cycleOBJ[nodeChilds[i].tagName] = new Object();  
//                   buildObjectNode(cycleOBJ[nodeChilds[i].tagName], nodeChilds[i]);  
//                 } else {  
//                   if (cycleOBJ[nodeChilds[i].tagName].length) {  
//                     cycleOBJ[nodeChilds[i].tagName][cycleOBJ[nodeChilds[i].tagName].length] = new Object();  
//                     buildObjectNode(cycleOBJ[nodeChilds[i].tagName][cycleOBJ[nodeChilds[i].tagName].length - 1], nodeChilds[i]);  
//                   } else {  
//                     cycleOBJ[nodeChilds[i].tagName] = [cycleOBJ[nodeChilds[i].tagName]];  
//                     cycleOBJ[nodeChilds[i].tagName][1] = new Object();  
//                     buildObjectNode(cycleOBJ[nodeChilds[i].tagName][1], nodeChilds[i]);  
//                   }  
//                 }  
//               } else {  
//                 cycleOBJ[nodeChilds[i].tagName] = nodeChilds[i][nodeText];  
//               }  
//             }  
//           }  
//         }  
//       }  
//     }  
//   }


//   function xmlToJson(xml) {
 
//     // Create the return object
//     var obj = {};
//     if (xml.nodeType == 1) { // element
//      // do attributes
//      if (xml.attributes.length > 0) {
//      obj["@attributes"] = {};
//       for (var j = 0; j < xml.attributes.length; j++) {
//        var attribute = xml.attributes.item(j);
//        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//       }
//      }
//     } else if (xml.nodeType == 3) { // text
//      obj = xml.nodeValue;
//     }
//     // do children
//     if (xml.hasChildNodes()) {
//      for(var i = 0; i < xml.childNodes.length; i++) {
//       var item = xml.childNodes.item(i);
//       var nodeName = item.nodeName;
//       if (typeof(obj[nodeName]) == "undefined") {
//        obj[nodeName] = xmlToJson(item);
//       } else {
//        if (typeof(obj[nodeName].push) == "undefined") {
//         var old = obj[nodeName];
//         obj[nodeName] = [];
//         obj[nodeName].push(old);
//        }
//        obj[nodeName].push(xmlToJson(item));
//       }
//      }
//     }
//     return obj;
//    };
export default fn;