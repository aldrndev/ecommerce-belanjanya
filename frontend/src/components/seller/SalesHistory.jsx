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
  Chip,
} from "@nextui-org/react";
import { MoreOutlined } from "@ant-design/icons";

const SalesHistory = () => {
  return (
    <CardLayout>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          size="lg"
          variant="underlined"
          color="danger"
        >
          <Tab key="semua penjualan" title="Semua Penjualan">
            <TablePage />
          </Tab>
          <Tab key="belum diproses" title="Belum diproses">
            <TablePage />
          </Tab>
          <Tab key="sedang diproses" title="Sedang diproses">
            <TablePage />
          </Tab>
          <Tab key="sedang dikirim" title="Sedang dikirim">
            <TablePage />
          </Tab>
          <Tab key="selesai" title="Selesai">
            <TablePage />
          </Tab>
        </Tabs>
      </div>
    </CardLayout>
  );
};

export default SalesHistory;

const TablePage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Table
        selectionMode="multiple"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>PRODUK</TableColumn>
          <TableColumn>NAMA PEMESAN</TableColumn>
          <TableColumn>JUMLAH PESANAN</TableColumn>
          <TableColumn>TOTAL HARGA</TableColumn>
          <TableColumn>STATUS</TableColumn>
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
                  <p className="font-bold">gerd zero pro lambung...</p>
                  <p>Rp100000</p>
                </div>
              </div>
            </TableCell>
            <TableCell>ALDRIN MURSIDI</TableCell>
            <TableCell>10000</TableCell>
            <TableCell>
              <p>Rp1000000</p>
            </TableCell>
            <TableCell>
              <Chip variant="flat" color="warning">
                Belum diproses
              </Chip>
            </TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="light">
                    <MoreOutlined />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">Lihat Pesanan</DropdownItem>
                  <DropdownItem key="copy">Proses Pesanan</DropdownItem>
                  <DropdownItem key="copy">Batalkan Pesanan</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
