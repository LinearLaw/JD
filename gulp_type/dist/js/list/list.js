"use strict";!function(){$commonRequest.getAuth(function(){location.href=$config.loginPage});var o=10,r=1;function n(){$("#romeName").val(""),$("#roomDesc").val(""),$("#roomAvatar").data("origin",""),$("#roomAvatar").attr("src",""),$("#roomAvatar").parent().removeClass("active")}function i(e,t){var a={pageNum:r,pageSize:o,userId:userInfo.userId};$.ajax({url:"/getRoomList",method:"GET",data:a,success:function(e){if(1==e.code){var o=e;o.data.map(function(e,a){o.data[a].timeText=$config.getTime(e.createTime).timeText,o.data[a].originAvatar=nowLocale+o.data[a].roomAvatar,o.data[a].curUI=userInfo.userId});var a=template("roomList",o);$(".roomListContainer").append(a),e.data.length<=0&&t&&t()}else t&&t()},error:function(e){console.log(e),t&&t()}})}i(),$(".welcomeName").html(userInfo.username+""),userInfo.userAvatar&&$("#headerAvatar").attr("src",nowLocale+userInfo.userAvatar).parent().addClass("active"),$(".closeRoomCreate").click(function(){n()}),$(".roomListContainer").on("click",".deleteItem",function(e){var a={roomId:$(e.currentTarget).data("i"),userId:userInfo.userId};$.ajax({url:"/delRoom",method:"POST",data:a,success:function(e){if(console.log(e),1==e.code)$TipsDialog({text:"Delete Room Success!"}),$(".roomListContainer").html(""),r=1,i();else{if(2==e.code)return void $TipsDialog({text:"This room you have no auth to delete"});$TipsDialog({text:"Error"})}},error:function(e){$TipsDialog({text:"Error"}),console.log(e)}})}),$("#createRoomNow").click(function(){var e={titleImgSrc:$("#roomAvatar").attr("src"),type:$("#roomAvatar").data("imgtype"),imgUse:0};$config.loading(),$commonRequest.uploadImg(e,function(e){$("#roomAvatar").attr("src",nowLocale+e),$("#roomAvatar").data("origin",e),function(){var e=$("#romeName").val().trim(),a=$("#roomDesc").val().trim(),o=$("#roomAvatar").data("origin");if(e&&a&&o){var t={userId:userInfo.userId,roomName:e,roomDesc:a,roomAvatar:o};$.ajax({url:"/createRoom",method:"POST",data:t,success:function(e){1==e.code?($TipsDialog({text:"Create Room Success!"}),$(".roomListContainer").html(""),r=1,i(),n(),$("#myModal").modal("hide")):$TipsDialog({text:"Create Room Failed ! Try Again ?"}),$config.loading("hide")},error:function(e){console.log(e),$config.loading("hide"),$TipsDialog({text:"Create Room Failed ! Try Again ?"})}})}}()})}),$("#avatarInput").on("change",function(){var e=new FileReader;f=$("#avatarInput")[0].files[0],console.log(f),e.readAsDataURL(f),e.onload=function(e){$("#roomAvatar").attr("src",this.result).data("imgtype",f.type).parent().addClass("active")}}),$("#avatarInputHeader").on("change",function(){var e=new FileReader;f=$("#avatarInputHeader")[0].files[0],e.readAsDataURL(f),e.onload=function(e){$("#headerAvatar").attr("src",this.result).data("type",f.type).parent().addClass("active");var a={titleImgSrc:$("#headerAvatar").attr("src"),type:f.type,imgUse:1};$commonRequest.uploadImg(a,function(o){$("#headerAvatar").data("origin",o),$commonRequest.updateUserInfo({userId:userInfo.userId,userAvatar:o},function(e){$TipsDialog({text:"Success!"});var a=JSON.parse($cookie.get("UIN"));a.userAvatar=o,$cookie.set("UIN",JSON.stringify(a))})})}}),$(".refreshList").click(function(e){$(e.currentTarget).children(".glyphicon").removeClass("roundFresh"),setTimeout(function(){$(e.currentTarget).children(".glyphicon").addClass("roundFresh"),r++,i(0,function(){$TipsDialog({text:"No More Data."}),--r<=1&&(r=1)})},100)})}();