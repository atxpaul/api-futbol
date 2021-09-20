import mongoose, { Schema } from 'mongoose';

class Match {
  initSchema() {
    const schema = new Schema({
      match: {
        type: Number,
        required: true,
      },
      teamLocal: {
        type: String,
        required: false,
      },
      teamAway: {
        type: String,
        required: false,
      },
      teamWinner: {
        type: String,
        required: false,
      },
      score: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    });
    mongoose.model('matches', schema);
  }
  getInstance() {
    this.initSchema();
    return mongoose.model('matches');
  }
}

export default Match;
