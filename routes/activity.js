const express = require('express'); 
const router = express.Router(); 

const activity = require("../data/activity"); 
const error = require("../utilities/error"); 


router
    .route("/")
    .get((req, res, next) => {
        if (req.query.taskId) {
            const taskId = req.query.taskId;
            const getActivity = activity.filter((a) => a.taskId == taskId);
            
                if (getActivity.length === 0) {
                return next(error(404, "Invalid taskId"));
            }

            
            return res.json({ taskId: taskId, filteredData: getActivity });
        }

        
        res.json({ filteredData: activity });
    })
    .post((req, res, next) => {
        const { taskId, userId, status } = req.body;

        if (!taskId || !userId || !status) {
            return next(error(400, "Insufficient data"));
        }

        const newActivity = {
            id: (activity.length + 1).toString(),
            taskId,
            userId,
            status,
        };

        activity.push(newActivity);
        res.json(newActivity);
    });

router
    .route("/:id")
    .get((req, res, next) => {
        const activityItem = activity.find((a) => a.id === req.params.id);

        if (activityItem) {
            res.json({ activity: activityItem });
        } else {
            next(error(404, "Activity not found"));
        }
    })
    .patch((req, res, next) => {
        const activityItem = activity.find((a, i) => {
            if (a.id === req.params.id) {
                for (const key in req.body) {
                    activity[i][key] = req.body[key];
                }
                return true;
            }
        });

        if (activityItem) {
            res.json(activityItem);
        } else {
            next(error(404, "Activity not found"));
        }
    })
    .delete((req, res, next) => {
        const activityIndex = activity.findIndex((a) => a.id === req.params.id);

        if (activityIndex !== -1) {
            const deletedActivity = activity.splice(activityIndex, 1);
            res.json(deletedActivity[0]);
        } else {
            next(error(404, "Activity not found"));
        }
    });

module.exports = router;
