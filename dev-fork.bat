@echo off
REM demo accounts
REM use beta version: npm i ganache@beta -g
REM 0x62930dcB266421Fd74906900ab03e1C0B707dcAC 0x1f87d59ec3d5f6b4acea637e1e3f5daa0c0fa902f4cfec11645d718401703116
REM 0x35Eb4F5e4A72acba1Feb0cF645F8eFaa21f3bdc0 0x424bdf2185c5a54c2a1cfd7ae4dccfa35f2069ad565edd3b3bf9e18723c8f3d3
ganache-cli -f ws://localhost:8546 --account="0x1f87d59ec3d5f6b4acea637e1e3f5daa0c0fa902f4cfec11645d718401703116,10000000000000000000" --account="0x424bdf2185c5a54c2a1cfd7ae4dccfa35f2069ad565edd3b3bf9e18723c8f3d3,100000000000000000" -b=3