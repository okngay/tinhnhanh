var TIME_STEP = 100;
var time_left = 10000; // 10 giây
var score = 0;
//var  rd = Math.floor(Math.random() * 99999);
var name = "";
var op ="";
var n1 = 1 ;
var n2 = 2 ;
var SetNum = ['>', '<', '='];  

var fblogin = 0;

$(document).ready(function() {
   $('#sentScore').hide();
  console.log("------------ BKD - BETA -- 1.0 ------------");
  Hiscore(); // Kiểm tra điểm cao nhất
 // $("#yourname").text("Ẩn danh " + rd);
  //name = "Ẩn danh " + rd ; 
  
     console.log(fblogin);
});


//FB
$("#facebook").click(function() {

  facebook();
  
});






function facebook() {
  var ref = new Firebase("https://tinhnhanh.firebaseio.com");
ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("FK False!");
  } else {
	   $("#facebook").hide();
	   fblogin = 1;
	  console.log("FB OK!");
	  $('#sentOk3').hide();
	  $('#sentOk4').removeClass('hidden');
	   console.log(fblogin);
	 $("#yourname").text(authData.facebook.displayName);
	  name = authData.facebook.displayName ;
	console.log("Tên: ", authData.facebook.displayName);
  }
} ,
 {
  remember: "sessionOnly",
 }

 ) ;
  
}






// Sự kiện khi nhấn nút "Bắt đầu "
$("#begin").click(function() {
	console.log("Bắt đầu ");
  // Xóa class "Hidden" để hiển thị
  $('#sentOk3').hide();
  $('#facebook').hide();
  $('#showqestions').removeClass('hidden');
  $('#truefalse').removeClass('hidden');
  $('#scoreShow').removeClass('hidden');
  // Tạo số ngẫu nhiên 
  generate_random();
  // Ẩn nút "Bắt đầu"
  $("#begin").hide();
  // Hiện nút "Đúng" và "Sai"
  $("#truefalse").show();
  //Thời gian thực hiện hàm
  setInterval(check_timmer, TIME_STEP);
});

// Xử lý khi chuột di qua lại nút "Bắt đầu "
$("#begin").mouseover(function() {
  $("#begin").attr("class", "card red animated flipInX");
});

$("#begin").mouseout(function() {
  $("#begin").attr("class", "card green animated flipInX");
});

$("#replay").mouseover(function() {
  $("#replay").attr("class", "card red animated flipInX");
});

$("#replay").mouseout(function() {
  $("#replay").attr("class", "card yellow animated flipInX");
});

// Xử lý khi bấm nút "Chơi lại "

$("#replay").click(function() {
  history.go(0); // Tải lại trang
});





function check_timmer() {
  time_left -= TIME_STEP;

  // Khi hết thời gian
  if (time_left < 0) {
    // Kiểm tra điểm
	time_left = 90000;
			 console.log(fblogin);
	console.log("***************************")
	console.log("********   Hết giờ   ******");
	console.log("***************************");
    Hiscore();
       
    //Ẩn hiện các nút
    $("#bar").attr("style", "width: " + 0 + "%");
    $('#replay').removeClass('hidden');  
   	
    $("#bars").hide();
    $("#truefalse").hide();
    $("#showqestions").hide();
	
	if (fblogin == 1 ) {
		 console.log("Hiển thị gửi điểm");
		 console.log(fblogin);
		$('#sentScore').show();
	}
	
	
  }

  // Thanh thời gian
  $("#bar").attr("style", "width: " + (time_left / 100) + "%");

}

// Kiểm tra điểm cao

function Hiscore() {
  // Kiểm tra localStorage.Hiscore có tồn tại 
  if (typeof(Storage) !== "undefined") {
    if (localStorage.Hiscore) {
      if (
        // nếu score > dữ liệu có trong localStorege --> gán score 
        score > localStorage.Hiscore) {
        localStorage.Hiscore = score;
		console.log("Điểm cao, " + score);

      }

    } else {
      // Gán điểm cao nhất = 0 , khi giá trị không xác định
      localStorage.Hiscore = 0;
    }
    //Hiển thị kỷ lục
    document.getElementById("Hiscore").innerHTML = "Kỷ lục :  " + localStorage.Hiscore + " Điểm";
  } else {
    // XỬ lý lỗi
    document.getElementById("Hiscore").innerHTML = "Hãy nâng cấp trình duyệt của bạn, để xem điểm cao";
  }
}

// Mảng trường hợp

var SetNum = ['>', '<', '='];  

//Tạo số ngẫu nhiên 
function generate_random() {
	
  $("#id_n1").text(Math.floor(Math.random() * 11  ));
  $("#id_n2").text(Math.floor(Math.random() * 11 ));
 
 
  n1 = parseInt($("#id_n1").text());
  op = SetNum[Math.floor(Math.random() * SetNum.length)];
  n2 = parseInt($("#id_n2").text());
  $("#id_op").text(op);
  
  console.log("---------------------------");
  console.log(n1);
  console.log(op);
  console.log(n2);
  console.log("----------------------------");
  
   
  
}


$("#itrue").click(function(){
	console.log("**********************");
	console.log("Chọn Đúng ");
	check_answer(true);
	
});

$("#ifalse").click(function(){
	console.log("**********************");
	console.log("Chọn Sai");
	check_answer(false);
	});


//Kiểm tra lựa chọn 
function check_answer(input) {
 
   
  // Thực hiện so sánh
  result = false;

  if (op == '>')
    result = n1 > n2;
  else if (op == '<')
    result = n1 < n2;
  else if (op == '=')
    result = n1 == n2;

  if (result == input) {
    // Khi trả lời đúng
	

	console.log("Bạn Đúng"); 
	console.log("**********************");
	 generate_random();
     time_left = time_left + 1000;
    score = score + 1;
    $("#id_total_score").text(score +" Điểm" );
      Materialize.toast('Đúng +1 giây', 300);
    
  }

  else

  {
	 
    //Khi  trả lời sai
	 console.log("Bạn Sai");
	 console.log("**********************");
	 generate_random();
    Materialize.toast('Sai -5 giây', 300);
    time_left = time_left - 5000;
    
   
  }
}



//Firebase 


 var LEADERBOARD_SIZE = 15;

  // Kết nối tới Firebase
  var scoreListRef = new Firebase('https://tinhnhanh.firebaseio.com/');

  // Keep a mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
  var htmlForPath = {};

  // Helper function that takes a new score snapshot and adds an appropriate row to our leaderboard table.
  function handleScoreAdded(scoreSnapshot, prevScoreName) {
    var newScoreRow = $("<tr/>");
    newScoreRow.append($("<td/>").append($("<em/>").text(scoreSnapshot.val().name)));
    newScoreRow.append($("<td/>").text(scoreSnapshot.val().score));

    // Store a reference to the table row so we can get it again later.
    htmlForPath[scoreSnapshot.key()] = newScoreRow;

    // Insert the new score in the appropriate place in the table.
    if (prevScoreName === null) {
      $("#leaderboardTable").append(newScoreRow);
    }
    else {
      var lowerScoreRow = htmlForPath[prevScoreName];
      lowerScoreRow.before(newScoreRow);
    }
  }

  // Helper function to handle a score object being removed; just removes the corresponding table row.
  function handleScoreRemoved(scoreSnapshot) {
    var removedScoreRow = htmlForPath[scoreSnapshot.key()];
    removedScoreRow.remove();
    delete htmlForPath[scoreSnapshot.key()];
  }

  // Create a view to only receive callbacks for the last LEADERBOARD_SIZE scores
  var scoreListView = scoreListRef.limitToLast(LEADERBOARD_SIZE);

  // Add a callback to handle when a new score is added.
  scoreListView.on('child_added', function (newScoreSnapshot, prevScoreName) {
    handleScoreAdded(newScoreSnapshot, prevScoreName);
  });

  // Add a callback to handle when a score is removed
  scoreListView.on('child_removed', function (oldScoreSnapshot) {
    handleScoreRemoved(oldScoreSnapshot);
  });

  // Add a callback to handle when a score changes or moves positions.
  var changedCallback = function (scoreSnapshot, prevScoreName) {
    handleScoreRemoved(scoreSnapshot);
    handleScoreAdded(scoreSnapshot, prevScoreName);
  };
  scoreListView.on('child_moved', changedCallback);
  scoreListView.on('child_changed', changedCallback);

  // When the user presses enter on scoreInput, add the score, and update the highest score.
 
	  
	    $("#sentScore").click(function () {
   
         if(score > 9) {
			 
	 $("#sentOk4").hide();
	 $("#sentOk3").hide();
      var newScore = score;
        
      var userScoreRef = scoreListRef.child(name);

      // Use setWithPriority to put the name / score in Firebase, and set the priority to be the score.
      userScoreRef.setWithPriority({ name:name, score:newScore }, newScore);
    
     $("#sentScore").hide();
   //  $("#nameInput").hide();
     $('#sentOk').removeClass('hidden');
	 
	 console.log("Gửi điểm với tên :  " +name);
	 Firebase.goOffline();
	 
	  }
  else  
  {   $("#sentOk3").hide();
      $("#sentOk4").hide();
	  $("#sentScore").hide(); 
      $('#sentOk2').removeClass('hidden');
      console.log("Điểm thấp gửi làm gì :v  " +name); 
	  Firebase.goOffline();
	  
	  
	  
   }
			
	 
	 
  });
	  
	  
	  
 
  
