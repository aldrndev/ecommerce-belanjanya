import { Image } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import CardLayout from "./CardLayout";

const UseProfile = () => {
  return (
    <div>
      <CardLayout>
        <div className="flex gap-x-10">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=2885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              width={450}
            />
          </div>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td colSpan={2} className="text-lg font-bold mb-4">
                  Biodata Diri
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Nama</td>
                <td>Aldrin Mursidi</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">No Handphone</td>
                <td>081234567890</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Alamat</td>
                <td>Jl Kramat Jati Indonesia, 17233</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Email</td>
                <td>
                  aldrin@gmail.com
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
            </tbody>
          </table>
        </div>
      </CardLayout>
    </div>
  );
};

export default UseProfile;
