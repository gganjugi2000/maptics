import React from 'react';
import styles from './AdvertiserList.module.css';
import classNames from 'classnames/bind';
import ListTable from '../../../../components/ListTableComponent/ListTable';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const AdvertiserList = ({ 
        rowData, 
        totalCount, 
        searchCount,
        handleAdvertiserDispatch, 
        handleAdvertiserCreate, 
        handleAdvertiserCallback
    }) => {

    const ColGroup = () => {
        return (
            <colgroup>
                <col width={"10%"} />
                <col width={"20%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"20%"} />
                <col width={"15%"} />
                <col width={"15%"} />
            </colgroup>
        )
    }
    
    const tableHead = [
        {id: "no",name: "번호" },
        {id: "advts_id", name: "아이디", type: "callback"},
        {id: "advts_nm",name: "광고주명"},
        {id: "advts_mng_nm",name: "담당자명"},
        {id: "email_addr",name: "이메일 계정"},
        {id: "phone_no",name: "연락처"},
        {id: "reg_dt",name: "등록일", data_type: 'date'},
    ];

    // render
    return (
        <div className={cx("listview")}>
            <ListTable
                colGroup={<ColGroup />}
                tableHead={tableHead}
                rowData={rowData}
                unit="명"
                totalCount={totalCount}
                searchCount={searchCount}
                handleTableDispatch={handleAdvertiserDispatch}
                handleTableDataCreate={handleAdvertiserCreate}
                handleTableCallback={handleAdvertiserCallback}
            />
        </div>
    )
}

export default AdvertiserList;