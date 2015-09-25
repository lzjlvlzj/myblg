/**
 * Created by ack on 2015/9/21.
 */
var Mood = {
    content : {type : String, default : "-_- 开心每一天!"},
    createDate : {type: Number, default: (new Date() - 0)}
};

module.exports = Mood;