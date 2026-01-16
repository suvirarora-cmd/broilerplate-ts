import { apiClient } from "./apiClient";

global.fetch=vi.fn();

it("throws AppError on failed response", async()=>{
    (fetch as any).mockResolvedValueOnce({
        ok:false,
        status:401,
        json:async()=>({
            ok:false,
            status:401,
            json:async ()=>({message:"Unauthorized"}),
        });

        await expect(apiClient("/test")).rejects.toMatchObject({
            source:"API",
            statusCode:401,
        });
    });
})

