"use client";

import { useState, useCallback, useEffect } from "react";
import SelectField, { SelectOption } from "../ui/SelectField";
import { getCustomersClient } from "@/lib/api/customers";

export function SingleUserSelect({
  value,
  onChange,
}: {
  value: SelectOption | null;
  onChange: (user: SelectOption | null) => void;
}) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = useCallback(async (pageToFetch = 1, query = "") => {
    try {
      setLoading(true);
      setError(null);

      const res: any = await getCustomersClient(pageToFetch, 50);
      const newOptions: SelectOption[] =
        res?.data?.map((c: any) => ({
          value: c.id,
          label: `${c.fullname} (${c.email})`,
        })) || [];

      if (pageToFetch === 1) {
        setOptions(newOptions);
      } else {
        setOptions((prev) => [...prev, ...newOptions]);
      }

      setHasMore(newOptions.length > 0);
    } catch (err: any) {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(1, "");
  }, [fetchUsers]);

  const handleScrollToEnd = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUsers(nextPage, searchTerm);
    }
  };

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setPage(1);
    fetchUsers(1, query);
  };

  return (
    <SelectField
      id="single-user"
      label="Select User"
      options={options}
      value={value}
      onChange={(val) => onChange(val as any)}
      placeholder={loading ? "Loading users..." : "Select a user"}
      isMulti={false}
      isLoading={loading}
      onMenuScrollToBottom={handleScrollToEnd}
      onInputChange={handleSearch}
    />
  );
}
