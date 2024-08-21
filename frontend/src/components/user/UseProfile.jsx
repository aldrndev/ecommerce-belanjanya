import { Chip } from "@nextui-org/react";
import CardLayout from "./CardLayout";

const UseProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const seller = JSON.parse(localStorage.getItem("seller"));
  const isSeller = localStorage.getItem("isSeller") === "true";

  let newAddress = "";

  if (isSeller) {
    const {
      address,
      province,
      city,
      district,
      subDistrict,
      rt,
      rw,
      postalCode,
    } = seller;

    newAddress = `${address}, rt ${rt} rw ${rw}, kelurahan ${district}, kecamatan ${subDistrict}, ${city}, ${province}, ${postalCode}`;
  }

  return (
    <div>
      <CardLayout>
        <div className="flex gap-x-10 h-[400px] p-2">
          <table className="w-full text-sm capitalize">
            <tbody>
              <tr>
                <td colSpan={2} className="text-lg font-bold mb-4">
                  Biodata Diri
                </td>
              </tr>
              <tr>
                <td className="font-semibold w-1/4">Nama</td>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <td className="font-semibold w-1/4">No Handphone</td>
                <td>{user?.phone}</td>
              </tr>
              <tr>
                <td className="font-semibold w-1/4">Alamat</td>
                <td className="capitalize">{user?.address}</td>
              </tr>
              <tr>
                <td className="font-semibold w-1/4">Email</td>
                <td className="lowercase">
                  {user?.email}
                  <Chip
                    color="success"
                    variant="flat"
                    size="sm"
                    className="ml-2"
                  >
                    Verified
                  </Chip>
                </td>
              </tr>
              {isSeller && (
                <>
                  <tr>
                    <td colSpan={2} className="text-lg font-bold mb-4">
                      Biodata Seller
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold w-1/4">Nama</td>
                    <td>{seller?.name}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold w-1/4">Alamat</td>
                    <td className="capitalize">{newAddress.toLowerCase()}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </CardLayout>
    </div>
  );
};

export default UseProfile;
