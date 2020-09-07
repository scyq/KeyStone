// 用来计数，来确定id
let widgetList = {
    button: -1,
    progressBar: -1,
    dialog: -1
}

// 创建selectmenu
$("#widgetSelector").selectmenu();

// 按下确定按钮后会把组件直接添加到末尾
$("#confirmButton").button().click(
    function (event) {
        // 先获取当前选定的元素
        const widgetType = $("#widgetSelector").val();
        
        // 根据选定元素来创建新的组件
        switch (widgetType) {
            case "按钮" :
                widgetList.button++;
                let button_id = "button" + widgetList.button;
                $('#content').append('<button id=' + button_id + '> ' + $('#widgetName').val() +' </button>').button();
                break;
            default: alert("非常抱歉，该组件正在开发中");
        }
    }
);