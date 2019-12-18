'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },

    nickname: {
      type: String,
      ref: 'users'
    },
    email: {
      type: String,
      ref: 'users'
    }
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  social: {
    website: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  bookedRuns: [
    {
      nameRun: {
        type: String,
        required: true
      },
      distance: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      locationRun: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  runs: [
    {
      nameRun: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      locationRun: {
        type: String,
        required: true
      },
      distance: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      pace: {
        type: String,
        required: true
      },
      feedback: {
        type: String
      },
      runPreview: {
        url: {
          type: String
        },
        public_id: {
          type: String
        }
      }
    }
  ],
  totalsRun: {
    totalKM: {
      type: String
    },
    totalTime: {
      type: String
    },
    totalRun: {
      type: Number
    },
    avgDistance: {
      type: String
    },
    avgPace: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports =
  mongoose.models.profile || mongoose.model('profiles', ProfileSchema);
