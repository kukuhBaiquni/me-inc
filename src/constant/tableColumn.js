import React from "react";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { Tag } from "antd";

export const customerColumn = (searchBy, query, isFilterActive) => {
    return [
        {
            title: "No",
            dataIndex: "key",
            key: "no"
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            render: name => (
                <Highlighter
                    highlightClassName="highlight"
                    searchWords={isFilterActive && searchBy === "name" ? [query] : []}
                    autoEscape={true}
                    textToHighlight={name}
                    />
            )
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            render: name => (
                <Highlighter
                    highlightClassName="highlight"
                    searchWords={isFilterActive && searchBy === "name" ? [query] : []}
                    autoEscape={true}
                    textToHighlight={name}
                    />
            )
        },
        {
            title: "Join Date",
            dataIndex: "join",
            key: "join",
            render: date => moment(date).format("DD MMM YYYY")
        },
        {
            title: "Address",
            dataIndex: "address.street",
            key: "address.street",
            render: name => (
                <Highlighter
                    highlightClassName="highlight"
                    searchWords={isFilterActive && searchBy === "address.street" ? [query] : []}
                    autoEscape={true}
                    textToHighlight={name}
                    />
            )
        },
        {
            title: "Zone Code",
            dataIndex: "address.zoneCode",
            key: "address.zoneCode",
            render: name => (
                <span>
                    <Tag color="blue">
                        <Highlighter
                            highlightClassName="highlight"
                            searchWords={isFilterActive && searchBy === "address.zoneCode" ? [query] : []}
                            autoEscape={true}
                            textToHighlight={name}
                            />
                    </Tag>
                </span>
            )
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: name => (
                <span>
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={isFilterActive && searchBy === "phone" ? [query] : []}
                        autoEscape={true}
                        textToHighlight={name}
                        />
                </span>
            )
        },
        {
            title: "Group",
            dataIndex: "group",
            key: "group"
        },
    ]
};
