import * as express from "express"
import { getAmphi_data, insertAmphi_data } from "../controller/amphie_controller"
import { getStage1_data, insertStage1_data } from "../controller/stage1_controller"
import { getStage2_data, insertStage2_data } from "../controller/stage2_controller"
import { getStage3_data, insertStage3_data } from "../controller/stage3_controller"
import { getGlobal_data, insertGlobal_data } from "../controller/global_controller"

const router = express.Router()

router.route("/amphie").get(getAmphi_data)
router.route("/amphie/insert").post(insertAmphi_data)

router.route("/global").get(getGlobal_data)
router.route("/global/insert").post(insertGlobal_data)

router.route("/stage1").get(getStage1_data)
router.route("/stage1/insert").post(insertStage1_data)

router.route("/stage2").get(getStage2_data)
router.route("/stage2/insert").post(insertStage2_data)

router.route("/stage3").get(getStage3_data)
router.route("/stage3/insert").post(insertStage3_data)


export default router;