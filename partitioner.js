var arrayList = [];
var arrayPercent = [];
var stepNumber = 5;
var startNumber = 5;
var itemTemplate = "";
var btnTemplate = "";
Usage: jQuery.fn.SetPartitioner = function (param) {
    var currentObject = $(this);
    $("body").on('click', '.RemovePercent', function () {
        debugger
        var itemIndex = $(this).attr("id");
        arrayPercent[parseInt(itemIndex)] = 0;
        SetPartition(currentObject);
    });
    $("body").on('click', '.partitionerAddBtn', function () {
        debugger
        var partitionItem = $('.DropPartitionItem').val();
        var itemPercent = $('.DropArrayPercent').val();
        arrayPercent[partitionItem] = itemPercent;
        SetPartition(currentObject);
    });

    //--------------------------------------------------- Initialize
    debugger
    arrayList = param.arrayList;
    if (param.stepNumber) {
        stepNumber = param.stepNumber;
    }
    if (param.stepNumber) {
        startNumber = param.startNumber;
    }
    //--------------------------------------------------- Variable Defining

    for (var i = 0; i < arrayList.length; i++) {
        arrayPercent.push(0);
    }
    debugger

    itemHtml = currentObject.children(".partitionerBox").html();
    currentObject.children(".partitionerBox").empty();

    btnTemplate = currentObject.children(".partitionerAddItemCntr").html();
    currentObject.children(".partitionerAddItemCntr").remove();

    SetPartition(currentObject);
}

function SetPartition(currentObject) {
    debugger
    var sumPercent = 0;
    //--------------------------------------------------- Set DropDown religion option
    var optionR = '';
    for (var i = 0; i < arrayList.length; i++) {
        if (arrayPercent[i] == 0) {
            optionR += '<option value="' + i + '">' + arrayList[i] + '</option>';
        } else {
            sumPercent += parseInt(arrayPercent[i]);
        }
    }
    //-------------------------------------------------- Create Partitioner Items
    var partitionerBoxHtml = "";
    for (var i = 0; i < arrayPercent.length; i++) {
        if (arrayPercent[i] > 0) {
            var newItemHtml = itemHtml
                .replace("#ItemName", arrayList[i])
                .replace("#ItemPercentText", arrayPercent[i])
                .replace("#itemIndex", i)
                .replace("#ItemPercentNumber", arrayPercent[i] - 1)
                ;
            partitionerBoxHtml = partitionerBoxHtml + newItemHtml;
        }
    }
    currentObject.children(".partitionerBox").html(partitionerBoxHtml + btnTemplate);
    //--------------------------------------------------- Set DropDown religion option
    var optionP = '';
    var min = startNumber;
    var max = 100 - sumPercent;
    if (arrayPercent.length - currentObject.children(".partitionerBox").children(".partitionItem").length == 1) {
        min = max;
    }
    for (var i = min; i <= max; i = i + stepNumber) {
        optionP += '<option value="' + i + '">' + i + '</option>';
    }
    //-------------------------------------------------- Append DropDown Items
    currentObject.find('.DroppartitionItem').empty();
    currentObject.find('.DroppartitionItem').append(optionR);

    currentObject.find('.DroparrayPercent').empty();
    currentObject.find('.DroparrayPercent').append(optionP);

    currentObject.find('#partitionerAddItem').css('width', (100 - sumPercent - 3) + '%');
    if (sumPercent < 100) {
        currentObject.find('#partitionerAddItem').show();
    } else {
        currentObject.find('#partitionerAddItem').hide();
    }
}
//-------------------------------------------------- Event Listener

//SetPartition();


