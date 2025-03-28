import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="relative py-22 w-full flex items-center justify-center mt-10">
            <div>
                <div className="w-full h-full overflow-hidden py-4 FOOTER md:container md:mx-auto px-4 flex justify-between gap-4 flex-wrap md:flex-nowrap ">
                    <Link
                        to={"/"}
                        className="w-full sm:w-[49%] text-[30px] font-semibold leading-none md:max-w-[150px] xl:max-w-[200px] text-black"
                    >
                        Tokenbay
                    </Link>

                    <div className="w-full flex flex-wrap md:flex-nowrap gap-10 flex-1 justify-between">
                        <p className="text-gray-800 leading-7 font-[Lato]">
                            <strong>Disclaimer: </strong>Token performance is
                            not indicative of future results. Always conduct
                            thorough research before investing.
                        </p>
                        <p className="text-gray-800 leading-7 font-[Lato]">
                            Interested in a specific token? Reach out to our
                            community for insights and analysis.
                        </p>
                    </div>
                </div>
                <p className="font-[Lato] text-center font-normal text-sm text-gray-800 w-full py-4">
                    © 2024. All rights reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
