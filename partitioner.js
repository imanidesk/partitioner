Usage: jQuery.fn.SetPartitioner = function (param) {
    debugger
    var currentObject = $(this);
    //-------------------------------------------------- Event Listener
    $("body").on('click', '.RemoveItem', function () {
        // debugger
        var rootItem = $(this).closest(".partitionerCntr");
        itemPercent = rootItem.attr("itemPercent").split(',');
        var itemIndex = $(this).attr("index");
        itemPercent[parseInt(itemIndex)] = 0;
        rootItem.attr("itemPercent", itemPercent.join(", "));
        SetPartition(currentObject);
    });
    $("body").on('click', '.addBtn', function () {
        // debugger
        var rootItem = $(this).closest(".partitionerCntr");
        itemPercent = rootItem.attr("itemPercent").split(',');
        var pItem = rootItem.find('.DItem').val();
        var itemPercentValue = rootItem.find('.DPercent').val();
        itemPercent[pItem] = itemPercentValue;
        rootItem.attr("itemPercent", itemPercent.join(", "));
        SetPartition(currentObject);
    });
    //--------------------------------------------------- Initialize
    // debugger
    currentObject.attr("itemList", param.itemList.join(","));
    var itemPercent = [];
    for (var i = 0; i < param.itemList.length; i++) { itemPercent.push("0"); }
    currentObject.attr("itemPercent", itemPercent.join(","));
    if (param.stepNumber) {
        currentObject.attr("stepNumber", param.stepNumber);
    } else {
        currentObject.attr("stepNumber", 5);
    }
    if (param.startNumber) {
        currentObject.attr("startNumber", param.startNumber);
    } else {
        currentObject.attr("startNumber", 5);
    }
    //--------------------------------------------------- Variable Defining
    SetPartition(currentObject);
}

function SetPartition(currentObject) {
    debugger
    var itemList = currentObject.attr("itemList").split(',');
    var itemPercent = currentObject.attr("itemPercent").split(',');
    var stepNumber = parseInt(currentObject.attr("stepNumber"));
    var startNumber = parseInt(currentObject.attr("startNumber"));

    var sumPercent = 0;
    //--------------------------------------------------- Set DropDown itemList option
    var optionR = '';
    for (var i = 0; i < itemList.length; i++) {
        if (itemPercent[i] == 0) {
            optionR += '<option value="' + i + '">' + itemList[i] + '</option>';
        } else {
            sumPercent += parseInt(itemPercent[i]);
        }
    }
    //-------------------------------------------------- Create Partitioner Items
    // debugger
    itemTemplate = currentObject.children(".pItemThem").html();
    addItemTemplate = currentObject.children(".pAddThem").html();
    currentObject.children(".pBox").empty();
    for (var i = 0; i < itemPercent.length; i++) {
        if (itemPercent[i] > 0) {
            currentObject.children(".pBox").append(itemTemplate);
            var newItem = currentObject.children(".pBox").find(".newitem");
            newItem.css('width', (itemPercent[i] - 1) + '%');
            newItem.find(".ItemName").html(itemList[i]);
            newItem.find(".PercentNumber").html(itemPercent[i] + " %");
            newItem.find(".RemoveItem").attr("index", i);
            newItem.removeClass("newitem")
        }
    }

    //-------------------------------------------------- Set DropDown itemPercent option
    if (sumPercent < 100) {
        currentObject.children(".pBox").append(addItemTemplate);
        var optionP = '';
        var min = startNumber;
        var max = 100 - sumPercent;
        if (itemPercent.length - currentObject.children(".pBox").children(".pItem").length == 1) {
            min = max;
        }
        for (var i = min; i <= max; i = i + stepNumber) {
            optionP += '<option value="' + i + '">' + i + '</option>';
        }
        var addItem = currentObject.children(".pBox").children(".addBox");
        addItem.css('width', (100 - sumPercent - 3) + '%');
        addItem.find('.DItem').empty().append(optionR);
        addItem.find('.DPercent').empty().append(optionP);
    }
}
