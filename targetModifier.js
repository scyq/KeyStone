// 用来计数，来确定id
let widgetList = {
    button: -1,
    progressBar: -1,
    dialog: -1,
    div: 3
}

// 颜色表
let colorList = {
    "黑色": "#000000",
    "黄色": "#FFFF00",
    "浅灰蓝色": "#B0E0E6",
    "象牙黑": "#292421",
    "香蕉色": "#E3CF57",
    "品蓝": "#4169E1",
    "灰色": "#C0C0C0",
    "镉黄": "#FF9912",
    "石板蓝": "#6A5ACD",
    "冷灰": "#808A87",
    "天蓝": "#87CEEB",
    "石板灰": "#708069",
    "暖灰色": "#808069",
    "金黄色": "#FFD700",
    "青色": "#00FFFF",
    "黄花色": "#DAA569",
    "绿土": "#385E0F",
    "白色": "#FFFFFF",
    "瓜色": "#E3A869",
    "靛青": "#082E54",
    "古董白": "#FAEBD7",
    "橙色": "#FF6100",
    "碧绿色": "#7FFFD4",
    "天蓝色": "#F0FFFF",
    "镉橙": "#FF6103",
    "青绿色": "#40E0D0",
    "白烟": "#F5F5F5",
    "胡萝卜色": "#ED9121",
    "绿色": "#00FF00",
    "白杏仁": "#FFFFCD",
    "桔黄": "#FF8000",
    "黄绿色": "#7FFF00",
    "淡黄色": "#F5DEB3",
    "钴绿色": "#3D9140",
    "蛋壳色": "#FCE6C9",
    "翠绿色": "#00C957",
    "花白": "#FFFAF0",
    "棕色": "#802A2A",
    "森林绿": "#228B22",
    "米色": "#A39480",
    "草地绿": "#7CFC00",
    "锻浓黄土色": "#8A360F",
    "酸橙绿": "#32CD32",
    "蜜露橙": "#F0FFF0",
    "锻棕土色": "#873324",
    "薄荷色": "#BDFCC9",
    "象牙白": "#FAFFF0",
    "巧克力色": "#D2691E",
    "草绿色": "#6B8E23",
    "亚麻色": "#FAF0E6",
    "肉色": "#FF7D40",
    "暗绿色": "#308014",
    "黄褐色": "#F0E68C",
    "海绿色": "#2E8B57",
    "玫瑰红": "#BC8F8F",
    "嫩绿色": "#00FF7F",
    "海贝壳色": "#FFF5EE",
    "肖贡土色": "#C76114",
    "雪白": "#FFFAFA",
    "标土棕": "#734A12",
    "紫色": "#A020F0",
    "乌贼墨棕": "#5E2612",
    "紫罗蓝色": "#8A2BE2",
    "红色": "#FF0000",
    "赫色": "#A0522D",
    "砖红": "#9C661F",
    "马棕色": "#8B4513",
    "湖紫色": "#9933FA",
    "镉红": "#E3170D",
    "沙棕色": "#F4A460",
    "淡紫色": "#DA70D6",
    "珊瑚色": "#FF7F50",
    "棕褐色": "#D2B48C",
    "梅红色": "#DDA0DD",
    "耐火砖红": "#B22222",
    "印度红": "#B0171F",
    "蓝色": "#0000FF",
    "栗色": "#B03060",
    "钴色": "#3D59AB",
    "粉红": "#FFC0CB",
    "草莓色": "#872657",
    "橙红色": "#FA8072",
    "锰蓝": "#03A89E",
    "蕃茄红": "#FF6347",
    "深蓝色": "#191970",
    "桔红": "#FF4500",
    "孔雀蓝": "#33A1C9",
    "深红色": "#FF00FF",
    "土耳其玉色": "#00C78C"
};
let colorTag = [];
// AutoComplete 内容表
for (const temp in colorList) colorTag.push(temp);
// 绑定颜色AutoComplete输入框
$("#bgColorInput").autocomplete({
    source: colorTag
});

// 绑定拖动网格
for (let i = 0; i <= widgetList.div; i++){
    let bundle_div = "#grid" + i;
    $(bundle_div).draggable();
}


// 创建组件selectmenu
$("#widgetSelector").selectmenu();

// 初始化网格选择器
$("#gridSelector").selectmenu();
for (let i = 0; i <= widgetList.div; i++) {
    $('#gridSelector').append($('<option>', {
        value: "#grid" + i,
        text: 'grid' + i
    }));
}


// 按下确定按钮后会把组件直接添加到末尾
$("#confirmButton").button().click(
    function (event) {
        // 改变背景颜色
        document.body.style.background = colorList[$("#bgColorInput").val()];

        // 先获取当前选定的元素
        const widgetType = $("#widgetSelector").val();

        // 获取要添加到的容器
        let appendGrid = $("#gridSelector").val();
        
        // 根据选定元素来创建新的组件
        switch (widgetType) {
            case "按钮" :
                widgetList.button++;
                let button_id = "button" + widgetList.button;
                $(appendGrid).append('<button id=' + button_id + '> ' + $('#widgetName').val() +' </button>').button();
                break;
            default: alert("非常抱歉，该组件正在开发中");
        }
    }
);