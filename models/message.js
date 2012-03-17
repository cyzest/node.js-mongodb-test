var Message = new Schema({
	id: Schema.ObjectId,
	userId: String,
	message: String
});
mongoose.model('Message', Message);
