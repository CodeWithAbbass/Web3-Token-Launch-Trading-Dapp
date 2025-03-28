import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { IoIosArrowDown, IoMdRefresh } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import KingToken from "../components/KingToken";
import Loader1 from "../components/Loaders/Loader1";
import ProgressBar from "../components/ProgressBar";
import { useLazyGetLatestTokensQuery } from "../store/services/modules/tokenApi";
import DataNotFound from "../components/DataNotFound";
import ConvertNumber from "../utils/ConvertNumber";
import formatNumber from "../utils/formatNumber";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { ZEROADDRESS } from "../config/web3";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Link } from "react-router-dom";

const Home = () => {
    const [getLatestTokens, { isLoading: isGetLTLoading }] =
        useLazyGetLatestTokensQuery();
    const { latestTokens } = useSelector((state) => state.essential);
    const { address } = useWeb3ModalAccount();
    const [order, setOrder] = useState("DESC");
    const [LToken, setLToken] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [filterParam, setFilterParams] = useState({
        sort: "Launch Time", // Launch Time || Volume || Market Cap || 24H Price Increase
        query: "",
    });
    const [debouncedQuery] = useDebounce(filterParam?.query, 1000);

    const updateFilters = (sort) => {
        setFilterParams((prev) => {
            const updated = { ...prev, sort };
            // getLatestTokens({ sort, query: debouncedQuery });
            return updated;
        });
    };

    const sortASCorDESC = () => {
        const list = [...LToken];
        if (order === "ASC") {
            list.sort((a, b) => a.name.localeCompare(b.name));
            setOrder("DESC");
        }
        if (order === "DESC") {
            list.sort((a, b) => b.name.localeCompare(a.name));
            setOrder("ASC");
        }

        setLToken(list);
    };

    const refetchLatestTokens = () => {
        setIsRefreshing(true);
        getLatestTokens(filterParam)
            .unwrap()
            .then(() => {
                setIsRefreshing(false);
            })
            .catch(() => {
                setIsRefreshing(false);
            });
    };

    useEffect(() => {
        if (debouncedQuery) {
            getLatestTokens({ sort: filterParam?.sort, query: debouncedQuery });
        } else {
            getLatestTokens();
        }
    }, [debouncedQuery, filterParam, getLatestTokens]);

    useEffect(() => {
        setLToken(latestTokens);
    }, [latestTokens]);

    return (
        <div className="text-center mt-2 HOME relative font-semibold">
            <section className="px-4 py-4 z-[1]">
                <section className="grid grid-cols-1 gap-6 items-stretch justify-between lg:grid-cols-2 text-left">
                    <div className="bg-[url(/images/MaskBg.png)] bg-no-repeat bg-cover relative p-6 border-2 border-black bgShadow  rounded-3xl py-10">
                        <div className="OpacityLayer absolute top-0 left-0 w-full h-full bg-[#FFEFCF] -z-[1] rounded-3xl"></div>
                        <h1 className="font-bold text-3xl mb-4">
                            Jump <br />
                            into the <br />
                            TokenBay!
                        </h1>
                        <img
                            src="/images/FPLogo2.png"
                            alt="TokenBay"
                            className="w-40 sm:w-48 absolute -top-5 -right-5"
                        />
                        <p className="text-[#090407] font-semibold">
                            Dive into the crypto world with TokenBay. Catch
                            trends early, stay informed about promising tokens,
                            and join the discussions.
                        </p>{" "}
                    </div>
                    <div className="bg-[#FFEFCF] px-4 py-6 border-2 border-black bgShadow  rounded-[31px]">
                        <KingToken />
                    </div>
                </section>

                <section className="mt-12 flex flex-col gap-5 text-left">
                    <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-3 ">
                        <fieldset className="flex-1 min-w-[280px] relative rounded-full overflow-hidden border-2 border-b-[6px] border-r-[6px] border-black bg_1">
                            <label className="">
                                <IoSearchOutline
                                    size={20}
                                    className="absolute left-2 top-[50%] translate-y-[-50%]"
                                />
                            </label>
                            <input
                                type="search"
                                placeholder="Search"
                                className="w-full h-full p-[12px] font-semibold ps-10 placeholder:text-black placeholder:font-semibold bg-inherit focus-within:outline-none"
                                value={filterParam?.query || ""}
                                onChange={(e) =>
                                    setFilterParams((prev) => {
                                        return {
                                            ...prev,
                                            query: e.target.value,
                                        };
                                    })
                                }
                            />
                        </fieldset>

                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                            <Menu as={"div"} className="sm:w-auto min-w-52">
                                <MenuButton className="min-w-52 relative rounded-full overflow-hidden border-2 border-b-[6px] border-r-[6px] border-black bg_1 flex items-center gap-2 h-full p-[10px] w-full">
                                    <IoIosArrowDown className="size-4 fill-black/60 " />
                                    <p className="">
                                        {filterParam?.sort || ""}
                                    </p>
                                </MenuButton>

                                <MenuItems
                                    transition
                                    anchor="bottom end"
                                    className="min-w-52 relative rounded-[21px] overflow-hidden border-2 border-b-[6px] border-r-[6px] border-black bg_1 flex flex-col items-center origin-top-right text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 font-semibold"
                                >
                                    <MenuItem>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 disabled:cursor-not-allowed disabled:text-gray-400 disabled:italic"
                                            disabled={
                                                filterParam?.sort ===
                                                "Launch Time"
                                            }
                                            onClick={() =>
                                                updateFilters("Launch Time")
                                            }
                                        >
                                            <p>Launch Time</p>
                                        </button>
                                    </MenuItem>

                                    <div className="my-1 w-full h-px bg-black/5" />

                                    <MenuItem>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 disabled:cursor-not-allowed disabled:text-gray-400 disabled:italic"
                                            disabled={
                                                filterParam?.sort === "Volume"
                                            }
                                            onClick={() =>
                                                updateFilters("Volume")
                                            }
                                        >
                                            <p>Volume</p>
                                        </button>
                                    </MenuItem>

                                    <div className="my-1 w-full h-px bg-black/5" />

                                    <MenuItem>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 disabled:cursor-not-allowed disabled:text-gray-400 disabled:italic"
                                            disabled={
                                                filterParam?.sort ===
                                                "Market Cap"
                                            }
                                            onClick={() =>
                                                updateFilters("Market Cap")
                                            }
                                        >
                                            <p>Market Cap</p>
                                        </button>
                                    </MenuItem>

                                    <div className="my-1 w-full h-px bg-black/5" />

                                    <MenuItem>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 disabled:cursor-not-allowed disabled:text-gray-400 disabled:italic"
                                            disabled={
                                                filterParam?.sort ===
                                                "24H Price Increase"
                                            }
                                            onClick={() =>
                                                updateFilters(
                                                    "24H Price Increase"
                                                )
                                            }
                                        >
                                            <p>24H Price Increase</p>
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>

                            <button
                                className="relative rounded-full overflow-hidden border-2 border-b-[6px] border-r-[6px] border-black bg_1 flex items-center gap-2 p-[14px]"
                                onClick={() => sortASCorDESC()}
                                disabled={
                                    !LToken ||
                                    LToken?.length === 0 ||
                                    isGetLTLoading
                                }
                            >
                                {order === "ASC" ? (
                                    <FaSortAlphaDown />
                                ) : (
                                    <FaSortAlphaDownAlt />
                                )}
                            </button>

                            <button
                                className={`relative rounded-full overflow-hidden border-2 border-b-[6px] border-r-[6px] border-black bg_1 flex items-center gap-2 p-[14px]`}
                                onClick={() => refetchLatestTokens()}
                                disabled={isGetLTLoading}
                            >
                                <IoMdRefresh
                                    className={`${
                                        isRefreshing ? "animateRefresh" : ""
                                    } `}
                                />
                            </button>
                        </div>
                    </div>

                    {isGetLTLoading ? (
                        <div className="flex items-center justify-center min-h-96">
                            <Loader1 />
                        </div>
                    ) : !isGetLTLoading && (!LToken || LToken?.length === 0) ? (
                        <div className="flex items-center justify-center min-h-96">
                            <DataNotFound />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-5 ">
                            {LToken?.map((token, index) => {
                                return (
                                    <Link
                                        to={`/trade/${token?.token || ""}`}
                                        className="bg-[#FFEFCF] px-4 py-6 rounded-3xl text-black flex flex-col justify-between"
                                        key={index}
                                    >
                                        <div className="flex flex-col lg:flex-row items-start gap-3">
                                            <img
                                                src={token?.image || ""}
                                                alt="Token Image"
                                                className="w-[100px] h-[100px] object-cover rounded-md"
                                            />
                                            <div>
                                                <h6 className="mb-2 font-bold text-lg">
                                                    {token?.name || ""} (
                                                    {token?.symbol || ""})
                                                </h6>
                                                <p className="font-semibold break-keep">
                                                    {token?.description?.slice(
                                                        0,
                                                        60
                                                    ) || ""}
                                                    {token?.description
                                                        ?.length > 60 && "..."}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                                                <div className="flex flex-wrap items-center mx-auto gap-2 px-4 py-1 bg-[#FEDF9E] rounded-full font-semibold text-sm ">
                                                    <p>Deployed by</p>
                                                    {address ? (
                                                        <Jazzicon
                                                            diameter={18}
                                                            seed={jsNumberForAddress(
                                                                address
                                                            )}
                                                        />
                                                    ) : (
                                                        <Jazzicon
                                                            diameter={18}
                                                            seed={jsNumberForAddress(
                                                                ZEROADDRESS
                                                            )}
                                                        />
                                                    )}
                                                    <p className="max-w-20 truncate">
                                                        {token?.user_name ||
                                                            token?.user_address ||
                                                            ""}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <p className="text-[#18B60A]">
                                                    Market Cap: $
                                                    {formatNumber(
                                                        ConvertNumber(
                                                            token?.market_cap,
                                                            true
                                                        )
                                                    )}
                                                </p>
                                                <ProgressBar
                                                    percentage={token?.lp || 0}
                                                    forgroundColor={"#18B60A"}
                                                    backgroundColor={"#FEDF9E"}
                                                    parentCss={
                                                        "overflow-hidden text-xs flex rounded-full h-[0.6rem]"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </section>
            </section>
        </div>
    );
};

export default Home;
