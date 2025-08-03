$(document).ready(function () {
    /*
     * Main variables
     */
    var content = [{
        title: "Hello chào anhh người iuu tuỵt zời nhất của emm ",
        desc: "Hôm nay em tới đây để mang những lời nhắn nhủ tới anhh đó mong anh sẽ lắng nghe anhh nháa"
    }, {
        title: "1.Lời cảm ơn từ emm",
        desc: "Anh ơi , Trong những năm tháng qua, anh đã là một phần không thể thiếu trong cuộc sống của em. Anh là người đã đem lại cho em nhiều niềm vui, hạnh phúc và sự ấm áp không ngừng nghỉ. Em muốn dành những dòng này để bày tỏ lòng biết ơn sâu sắc đến anh vì tất cả những điều tuyệt vời mà anh đã mang lại cho cuộc đời em.Anh đã luôn ở bên cạnh, hỗ trợ và động viên em trong mọi thử thách và khó khăn. Những lúc em gặp khó khăn nhất, anh luôn là người đứng đầu tiên xuất hiện để cùng em vượt qua mọi rắc rối.Anh là người đã cho em biết được ý nghĩa thực sự của tình yêu và sự quan tâm. Bằng cách nói và hành động, anh đã chứng minh rằng tình yêu không chỉ là lời hứa hẹn mà còn là những hành động nhỏ nhưng ý nghĩa.Anh là người đã cho em biết được ý nghĩa thực sự của tình yêu và sự quan tâm. Bằng cách nói và hành động, anh đã chứng minh rằng tình yêu không chỉ là lời hứa hẹn mà còn là những hành động nhỏ nhưng ý nghĩa"
    }, {
       title: "2.Lời xin lỗi từ em",
       desc: "Anh ơi, em xin lỗi về những lúc đã làm anh buồn và không vui. Em thực sự hối hận về những hành động và lời nói không đúng đắn của mình. Em nhận ra rằng em đã gây ra sự đau lòng và phiền muộn cho anh, và điều đó làm em cảm thấy rất xấu hổ. Em biết rằng tình yêu của chúng ta cần được bảo vệ và chăm sóc, và em sẽ cố gắng hơn nữa để không gây ra những xích mích và hiểu lầm. Mong anh có thể tha thứ cho em và tiếp tục xây dựng mối quan hệ của chúng ta trong tình thương và sự hiểu biết. Em yêu anh."
    }, {
        title: "3.Lời động viên từ em",
        desc: "Anh yêu ơi, trong cuộc sống này, có những lúc chúng ta gặp phải những thử thách khó khăn và những buổi tối tăm. Nhưng đừng bao giờ quên rằng anh có một người đứng sau lưng, luôn ủng hộ và tin tưởng anh từng bước đi. Em muốn nói với anh rằng anh là một người đáng kính, mạnh mẽ và kiên định. Dù bất cứ điều gì xảy ra, em sẽ luôn ở đây, bên cạnh anh, để cùng nhau vượt qua mọi khó khăn. Hãy nhớ rằng mọi khó khăn đều sẽ qua đi và mặt trời sẽ lặn, nhưng niềm tin và tình yêu của chúng ta sẽ mãi mãi. Hãy tin vào bản thân và tiếp tục điều hướng đến những ước mơ và mục tiêu của mình. Em yêu anh và sẽ luôn ở đây, bên cạnh anh."
    }, {
        title: "4.Lời iuu anhh:333",
        desc: "Anh iu ơi ,Mỗi sáng thức dậy, trái tim em lại rộn ràng vì sự hiện diện của anh. Đôi mắt anh như hai ngôi sao sáng chiếu soi bước đường em đi, mang lại cho em niềm tin và hy vọng. Em muốn nói với anh rằng từ khi có anh, cuộc sống của em đã trở nên đầy đủ và ý nghĩa hơn bao giờ hết,Anh là người em yêu thương và trân trọng nhất, là người bạn đồng hành tin cậy và đồng điệu với mọi suy tư và ước mơ của em. Những cử chỉ nhỏ nhưng ý nghĩa, những lời nói ngọt ngào và sự quan tâm ân cần của anh luôn làm cho em cảm thấy được yêu thương và quan trọng.Dù có bao nhiêu khó khăn và thử thách, em tin rằng chúng ta sẽ vượt qua mọi điều cùng nhau. Bởi vì anh là nguồn động viên, là nguồn sức mạnh và là điểm tựa vững chắc nhất của em.Hãy tin rằng em yêu anh không chỉ là ngày hôm nay mà còn mãi mãi trong tương lai. Em sẽ ở bên cạnh anh, mãi yêu anh hơn bất cứ điều gì trên thế giới này.Hy vọng điều này sẽ làm cho anh cảm thấy hạnh phúc và ấm áp!"
 }];
    var currentPage = 0;
    //generate content
    for (var i = 0; i < content.length; i++) {
        //split content letters to array
        for (var obj in content[i]) {
            //if string
            if (typeof content[i][obj] === "string") {
                content[i][obj] = content[i][obj].split("");
                continue;
            }
            //if array (grouped text)
            else if (typeof content[i][obj] === "object") {
                var toPush = [];
                for (var j = 0; j < content[i][obj].length; j++) {
                    for (var k = 0; k < content[i][obj][j].length; k++) {
                        toPush.push(content[i][obj][j][k]);
                    }
                }
                content[i][obj] = toPush;
            }
        }
        //set text to 
        $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
        //clone to data
        $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
        setText();
    }
    //initial arrangement
    arrangeCurrentPage();
    scrambleOthers();
    /*
     * Event handlers
     */
    $(window).resize(function () {
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function () {
        $("#soup-next").show();
        currentPage--;
        if (currentPage === 0) {
            $("#soup-prev").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    $("#soup-next").click(function () {
        $("#soup-prev").show();
        currentPage++;
        if (currentPage === content.length - 1) {
            $("#soup-next").hide();
        }
        arrangeCurrentPage();
        scrambleOthers();
    });
    /*
     * Functions
     */
    function arrangeCurrentPage() {
        for (var i = 0; i < content[currentPage].title.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
        for (var i = 0; i < content[currentPage].desc.length; i++) {
            $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
                left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
                top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
                color: "#111",
                zIndex: 9001
            });
        }
    }

    function setText() {
        var j;
        for (j = 0; j < content[i].title.length; j++) {
            $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
        }
        for (j = 0; j < content[i].desc.length; j++) {
            $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
        }
    }

    function scrambleOthers() {
        for (var i = 0; i < content.length; i++) {
            //don't scramble currentPage
            if (currentPage === i)
                continue;
            var parts = [
                ["title", ".soup-title"],
                ["desc", ".soup-desc"]
            ];
            //apply to .title h1s and .desc ps
            for (var j = 0; j < parts.length; j++) {
                for (var k = 0; k < content[i][parts[j][0]].length; k++) {
                    //define random position on screen
                    var randLeft = Math.floor(Math.random() * $(window).width());
                    var randTop = Math.floor(Math.random() * $(window).height());
                    //defining boundaries
                    var offset = $(".position-data").eq(currentPage).offset();
                    var bounds = {
                        left: offset.left,
                        top: offset.top,
                        right: $(window).width() - offset.left,
                        bottom: $(window).height() - offset.top
                    };
                    var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
                    var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
                    //finally, apply all the scrambles
                    $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
                        left: randLeft,
                        top: randTop,
                        color: "#DDD",
                        zIndex: "initial"
                    });
                }
            }
        }
    }
});