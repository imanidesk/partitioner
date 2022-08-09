$(document).ready(function () {
    var religionList = ["شیعه", "اهل سنت", "مسیحیت", "کلیمی و ارمنی", "زرتشتی", "اهل حق", "دراویش صوفی", "بهائیت", "سایر مذاهب"];
    var religionPercent = [];
    for (var i = 0; i < religionList.length; i++) {
        religionPercent.push(0);
    }
    var StepNumber = 5;
    var StartNumber = 5;

    var itemHtml = $(".partitionerCntr").html();
    $(".partitionerCntr").empty();

    var partitionerAddHtml = document.getElementById("partitionerAddItem").outerHTML;
    $("#partitionerAddItem").remove();

    function SetPartitioner() {
        var sumPercent = 0;
        //--------------------------------------------------- Set DropDown religion
        var optionR = '';
        for (var i = 0; i < religionList.length; i++) {
            if (religionPercent[i] == 0) {
                optionR += '<option value="' + i + '">' + religionList[i] + '</option>';
            } else {
                sumPercent += parseInt(religionPercent[i]);
            }
        }
        //--------------------------------------------------/ Set DropDown religion
        //-------------------------------------------------- Create Partitioner Items
        var partitionerCntrHtml = "";
        for (var i = 0; i < religionPercent.length; i++) {
            if (religionPercent[i] > 0) {
                var newItemHtml = itemHtml
                    .replace("#ItemName", religionList[i])
                    .replace("#ItemPercentText", religionPercent[i])
                    .replace("#ItemIndex", i)
                    .replace("#ItemPercentNumber", religionPercent[i] - 1)
                    ;
                partitionerCntrHtml = partitionerCntrHtml + newItemHtml;
            }
        }

        $(".partitionerCntr").html(partitionerCntrHtml + partitionerAddHtml);


        //-------------------------------------------------/ Create Partitioner Items
        //--------------------------------------------------- Set DropDown religion
        var optionP = '';
        var min = StartNumber;
        var max = 100 - sumPercent;
        if (religionPercent.length - $(".partitionerCntr").children(".partitionItem").length == 1) {
            min = max;
        }
        for (var i = min; i <= max; i = i + StepNumber) {
            optionP += '<option value="' + i + '">' + i + '</option>';
        }
        //--------------------------------------------------/ Set DropDown religion

        $('.DropPartitionItem').empty();
        $('.DropPartitionItem').append(optionR);

        $('.DropReligionPercent').empty();
        $('.DropReligionPercent').append(optionP);

        $('#partitionerAddItem').css('width', (100 - sumPercent - 3) + '%');
        if (sumPercent < 100) {
            $('#partitionerAddItem').show();
        } else {
            $('#partitionerAddItem').hide();
        }

    }
    $("body").on('click', '.RemovePercent', function () {
        var ItemIndex = $(this).attr("id");
        religionPercent[parseInt(ItemIndex)] = 0;
        SetPartitioner();
    });
    $("body").on('click', '.partitionerAddBtn', function () {
        var PartitionItem = $('.DropPartitionItem').val();
        var ReligionPercent = $('.DropReligionPercent').val();
        religionPercent[PartitionItem] = ReligionPercent;
        SetPartitioner();
    });
    SetPartitioner();
});
