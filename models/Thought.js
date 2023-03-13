const { Schema, model, Types } = require('mongoose');

const format = require('date-format');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timeStamp => format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, timeStamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

