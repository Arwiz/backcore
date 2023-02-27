import express from 'express';
import {
    CreateTeam,
    DeleteTeamByIdHandler,
    GetAllTeams,
    GetTeamByIdHandler,
    UpdateTeamByIdHandler
} from "./controller/team.controller";
const router = express.Router();

// Find route and put handler
router.route('/teams')
    .get(GetAllTeams)
    .post(CreateTeam)

router.route('/teams/:id')
    .get(GetTeamByIdHandler)
    .put(UpdateTeamByIdHandler)
    .delete(DeleteTeamByIdHandler)

export default router;