import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";

const Buynowmodal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return(
        <>
            <Button className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl" type="button" onClick={handleOpen}>Buy Now</Button>
            <Dialog open={open} handler={handleOpen} className=" bg-pink-50">
                <DialogBody>
                    <div className="mb-3">
                        <input type="text" name="name" className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300" placeholder="Enter Your Name"
                            value={addressInfo.name}
                            onChange={(e) =>{
                                setAddressInfo({
                                    ...addressInfo,
                                    name : e.target.value,
                                })
                            }} 
                        />
                    </div>
                    <div className="mb-3">
                        <input type="text" name="address" className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300" placeholder="Enter Your Address"
                            value={addressInfo.address}
                            onChange={(e) =>{
                                setAddressInfo({
                                    ...addressInfo,
                                    address : e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="number" name="pincode" className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300" placeholder="Enter Your Pincode"
                            value={addressInfo.pincode}
                            onChange={(e) =>{
                                setAddressInfo({
                                    ...addressInfo,
                                    pincode : e.target.value
                                })
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="number" name="mobilenumber" className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300" placeholder="Enter Your MobileNumber"
                            value={addressInfo.mobilenumber}
                            onChange={(e) =>{
                                setAddressInfo({
                                    ...addressInfo,
                                    mobilenumber : e.target.value
                                })
                            }}
                        />
                    </div>
                    <div>
                        <button className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg" type="button" onClick={() =>{ handleOpen(); buyNowFunction(); }}>Buy Now</button>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );

}
export default Buynowmodal