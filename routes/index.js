var url = require('url');

exports.index = function(req, res){
	var pageNo = 1;
	var pageSize = 10;

	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	if(query.pageNo > 0) pageNo = query.pageNo;
	if(query.pageSize > 0) pageSize = query.pageSize;

	var totalCount = 0;
	MessageModel.count(function(err,count){
		if(err) throw err;
		totalCount = count;
		MessageModel.find().desc('_id').skip((pageNo-1)*pageSize).limit(pageSize).run(function(err,messages){
			if(err) throw err;
			res.render('index', { pageNo:pageNo, pageSize:pageSize, totalCount:totalCount, messages:messages });
		});
	});
};

exports.addMessage = function(req, res){
	var pageNo = 1;
	var pageSize = 10;
	
	var message = new MessageModel();
	message.userId = req.body.userId;
	message.message = req.body.message;
	
	message.save(function(err){
		if(err) throw err;
		var totalCount = 0;
		MessageModel.count(function(err,count){
			if(err) throw err;
			totalCount = count;
			MessageModel.find().desc('_id').skip((pageNo-1)*pageSize).limit(pageSize).run(function(err,messages){
				if(err) throw err;
				res.json({ pageNo:pageNo, pageSize:pageSize, totalCount:totalCount, messages:messages });
			});
		});
	});
};
