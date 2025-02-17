import { redirect } from "@sveltejs/kit";

export async function GET(event) {
    
    return redirect(302, '../../../');
}