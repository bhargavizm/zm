import checkFreePlanEligibility from "../../../common/checkFreePlanEligibility";


export async function GET(req, { params }) {
  const { userId, userFirstLoginDate } = params;
  const result = await checkFreePlanEligibility(userId, userFirstLoginDate);
  return Response.json(result);
}
