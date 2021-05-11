Vue.component('vue-chat',{
	data(){
		return{
			
		}
	},
	mounted(){
			$(".msg_left div").remove();
	//		$(".msg_right div").remove();
			$(".right_content p").remove();
			$(".left_top_text span").remove();
	},
	template:`<div id="tap">
			<div class="left">
				<div class="left_top_right">
					<span onclick="guanbi()" class="glyphicon glyphicon-remove"></span>
				</div>
				<div class="left_top">
					
					<div class="left_top_text">
						<span class="left_top_online"></span>
					</div>
				</div>
				<div id="message">
					<div class="msg_left"></div>
					<div class="msg_right"></div>
				</div>
				<div class="msg_input">
					<div class="msg_img">
						<a id="lists">聊天记录</a>
					    <input type="file" id="file" name="tcp" style="display: none"/>
					    <img class="emotion" src="/lvyou/public/static/images/QQlogo.jpg"/>
					    <span class="glyphicon glyphicon-picture"></span>
					</div>
					<div contenteditable="true" style="width: 760px; height: 123px; " id="textarea"></div>
				</div> 
				<div class="msg_button">
				    <button type="button" id="send" class="btn btn-info" onclick="Send()">发送</button> 
				    <div id="msgLists"></div>
				</div>
			</div>
			<div class="right">
				<div class="text">
				    <h3>消息列表</h3>
				    <div class="title"></div>
				</div>
				<div class="right_content">
					
				</div>
			</div>
		</div>`
})