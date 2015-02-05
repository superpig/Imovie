$(function(){
	$('.headPhoto').click(function (e){
		var target = $(this)
		var commentId = target.data('cid')
		var toId = target.data('tid')
		$('#textareaId').focus()
		//console.log($('#textareaId'))
		/*
			作用: 设置回复对象为最后点击的对象
			方法：如果隐藏表单存在只对其id复制，否则添加元素
		*/
		if ($('#commentId').length > 0) {
			$('#commentId').val(commentId)
		} else {
			$('<input>').attr({
				type: 'hidden',
				id: 'commentId',
				name: 'comment[cid]',
				value: commentId
			}).appendTo('#commentForm')
		}
		
		if ($('#toId').length > 0) {
			$('#toId').val(toId)
		} else {
			$('<input>').attr({
				type: 'hidden',
				id: 'toId',
				name: 'comment[tid]',
				value: toId
			}).appendTo('#commentForm')		
		}
	}) 
})