import { ColumnDef } from "@tanstack/react-table";
import { Attestation } from "@verax-attestation-registry/verax-sdk";
import { t } from "i18next";
import moment from "moment";
import { Address } from "viem";
import { hexToNumber } from "viem/utils";

import { HelperIndicator } from "@/components/HelperIndicator";
import { Link } from "@/components/Link";
import { SortByDate } from "@/components/SortByDate";
import { toAttestationById } from "@/routes/constants";
import { displayAmountWithComma } from "@/utils/amountUtils";
import { cropString } from "@/utils/stringUtils";

import { links } from "../index";

interface ColumnsProps {
  sortByDate: boolean;
}

export const columns = ({ sortByDate = true }: Partial<ColumnsProps> = {}): ColumnDef<Attestation>[] => [
  {
    accessorKey: "id",
    header: () => (
      <div className="flex items-center gap-2.5">
        <HelperIndicator type="attestation" />
        {t("attestation.list.columns.id")}
      </div>
    ),
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <Link to={toAttestationById(id as string)} className="hover:underline hover:text-text-quaternary">
          {displayAmountWithComma(hexToNumber(id as Address))}
        </Link>
      );
    },
  },
  {
    accessorKey: "portal",
    header: () => (
      <div className="flex items-center gap-2.5">
        <HelperIndicator type="portal" />
        {t("attestation.list.columns.portal")}
      </div>
    ),
    cell: ({ row }) => cropString(row.getValue("portal")),
  },
  {
    accessorKey: "schemaString",
    header: () => (
      <div className="flex items-center gap-2.5">
        <HelperIndicator type="schema" />
        {t("attestation.list.columns.schema")}
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: () => <p className="text-left">{t("attestation.list.columns.subject")}</p>,
    cell: ({ row }) => {
      const subject = row.getValue("subject") as string;
      return (
        <a
          href={`${links.lineascan.address}/${subject}`}
          target="_blank"
          className="hover:underline hover:text-text-quaternary"
        >
          {cropString(subject)}
        </a>
      );
    },
  },
  {
    accessorKey: "attestedDate",
    header: () => (sortByDate ? <SortByDate /> : <p className="text-right">{t("attestation.list.columns.issued")}</p>),
    cell: ({ row }) => {
      const timestamp: number = row.getValue("attestedDate");
      return <p className="text-right">{moment.unix(timestamp).fromNow()}</p>;
    },
  },
];
