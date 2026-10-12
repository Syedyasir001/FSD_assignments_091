import express from 'express';
import {getUserFromToken} from "./UserFunctions.js";
import Vote from "./models/Vote.js";

const router = express.Router();

router.get('/vote/:commentId/:direction', (req, res) => {
  getUserFromToken(req.cookies.token)
    .then(userInfo => {
      // removing my existing votes
      Vote.deleteMany({commentId:req.params.commentId,author:userInfo.username})
        .then(() => {
          if (['up','down'].indexOf(req.params.direction) === -1) {
            res.json(true);
            return;
          }
          // creating my new vote
          const vote = new Vote({
            author: userInfo.username,
            direction: req.params.direction === 'up' ? 1 : -1,
            commentId: req.params.commentId,
          });
          vote.save().then(() => {
            res.json(true);
          });
        });
    })
    .catch(err => {
      res.status(401).json({error: 'Must be logged in to vote'});
    });
});

router.post('/votes', (req,res) => {
  const {commentsIds} = req.body;

  function sendVotesResponse(userInfo) {
    Vote.find({commentId: {'$in': commentsIds}})
      .then(votes => {
        let commentsTotals = {};
        votes.forEach(vote => {
          if (typeof commentsTotals[vote.commentId] === 'undefined') {
            commentsTotals[vote.commentId] = 0;
          }
          commentsTotals[vote.commentId] += vote.direction;
        });

        let userVotes = {};
        if (userInfo && userInfo.username) {
          votes.forEach(vote => {
            if (vote.author === userInfo.username) {
              userVotes[vote.commentId] = vote.direction;
            }
          });
        }

        res.json({commentsTotals, userVotes});
      });
  }

  getUserFromToken(req.cookies.token)
    .then(userInfo => {
      sendVotesResponse(userInfo);
    })
    .catch(() => {
      // Not logged in, send votes without user specific vote state
      sendVotesResponse(null);
    });
});

export default router;
