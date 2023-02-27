import express from 'express';
import { GetAllColoumns, GetColoumnByModuleId, CreateColoumn, 
    UpdateColoumnByModuleId, DeleteColoumnByModuleId
} from "./controller/coloumn.controller";

const router = express.Router();

// Find route and put handler
router.route('/')
    .get(GetAllColoumns)
    .post(CreateColoumn)

router.route('/:colId')
    .put(UpdateColoumnByModuleId)


router.route('/:moduleId')
    .get(GetColoumnByModuleId)    
    .delete(DeleteColoumnByModuleId)


export default router;