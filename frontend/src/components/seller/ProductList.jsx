import CardLayout from "../user/CardLayout";
import {
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import { MoreOutlined } from "@ant-design/icons";

const ProductList = () => {
  return (
    <CardLayout>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          size="lg"
          variant="underlined"
          color="danger"
        >
          <Tab key="semua produk" title="Semua Produk">
            <TablePage />
          </Tab>
          <Tab key="aktif" title="Aktif">
            <TablePage />
          </Tab>
          <Tab key="nonaktif" title="Nonaktif">
            <TablePage />
          </Tab>
        </Tabs>
      </div>
    </CardLayout>
  );
};

export default ProductList;

const TablePage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Table
        selectionMode="multiple"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>PRODUK</TableColumn>
          <TableColumn>STOCK</TableColumn>
          <TableColumn>TERJUAL</TableColumn>
          <TableColumn>AKTIF</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              <div className="flex gap-x-2">
                <div>
                  <Image
                    src="https://images.tokopedia.net/img/cache/900/VqbcmM/2023/1/4/c0efc509-0ccf-4c97-b5e0-03e8419b66f6.png"
                    width={50}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="font-bold">
                    gerd zero pro lambung original obat herbal alami
                  </p>
                  <p>Rp100000</p>
                </div>
              </div>
            </TableCell>
            <TableCell>10000</TableCell>
            <TableCell>500</TableCell>
            <TableCell>
              <Switch defaultSelected aria-label="aktif" />
            </TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="light">
                    <MoreOutlined />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">Lihat Produk</DropdownItem>
                  <DropdownItem key="copy">Edit Produk</DropdownItem>
                  <DropdownItem key="copy">Hapus Produk</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
